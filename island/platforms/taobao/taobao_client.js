"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaobaoClient = void 0;
const qs_1 = __importDefault(require("qs"));
const axios_1 = __importDefault(require("axios"));
const moment_1 = __importDefault(require("moment"));
const md5_1 = __importDefault(require("crypto-js/md5"));
class TaobaoClient {
    constructor(clientConfig) {
        this.appKey = clientConfig.appKey;
        this.secretKey = clientConfig.secretKey;
        this.endpoint = clientConfig.endpoint || 'https://eco.taobao.com/router/rest';
    }
    sign(params) {
        const sortedKeys = Object.keys(params).sort();
        var plainString = '';
        for (var i = 0; i < sortedKeys.length; i++) {
            const key = sortedKeys[i];
            const value = params[key];
            plainString += key + value;
        }
        plainString = this.secretKey + plainString + this.secretKey;
        return (0, md5_1.default)(plainString).toString().toUpperCase();
    }
    async execute(method, input) {
        const params = {
            method,
            v: '2.0',
            format: 'json',
            sign_method: 'md5',
            app_key: this.appKey,
            timestamp: (0, moment_1.default)().unix()
        };
        params['sign'] = this.sign(Object.assign({}, params, input));
        const response = await axios_1.default.post(this.endpoint, qs_1.default.stringify(input), { params });
        const responseData = response.data;
        if (responseData.error_response) {
            const error = responseData.error_response;
            return {
                code: error.code,
                message: error.msg,
                error: true
            };
        }
        let field;
        if (method.startsWith('taobao.')) {
            field = `${method.substring(7).replace(/\./g, '_')}_response`;
        }
        else {
            field = `${method.replace(/\./g, '_')}_response`;
        }
        return responseData[field];
    }
}
exports.TaobaoClient = TaobaoClient;
