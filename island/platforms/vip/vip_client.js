"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VipClient = void 0;
const axios_1 = __importDefault(require("axios"));
const moment_1 = __importDefault(require("moment"));
const hmac_md5_1 = __importDefault(require("crypto-js/hmac-md5"));
class VipClient {
    constructor(clientConfig) {
        this.appKey = clientConfig.appKey;
        this.secretKey = clientConfig.secretKey;
        this.endpoint = clientConfig.endpoint || 'https://vop.vipapis.com';
    }
    sign(params, input) {
        const sortedKeys = Object.keys(params).sort();
        var plainString = '';
        for (var i = 0; i < sortedKeys.length; i++) {
            const key = sortedKeys[i];
            const value = params[key];
            plainString += key + value;
        }
        plainString += JSON.stringify(input);
        return (0, hmac_md5_1.default)(plainString, this.secretKey).toString().toUpperCase();
    }
    async execute(service, version, method, input) {
        const params = {
            method,
            service,
            version,
            format: 'json',
            appKey: this.appKey,
            timestamp: (0, moment_1.default)().unix()
        };
        params['sign'] = this.sign(params, input);
        const response = await axios_1.default.post(this.endpoint, input, { params });
        const responseData = response.data;
        if (responseData['returnCode'] && responseData['returnMessage']) {
            return {
                code: responseData['returnCode'],
                message: responseData['returnMessage'],
                error: true
            };
        }
        return responseData['result'];
    }
}
exports.VipClient = VipClient;
