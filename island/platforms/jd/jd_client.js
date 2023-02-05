"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JDClient = void 0;
const axios_1 = __importDefault(require("axios"));
const moment_1 = __importDefault(require("moment"));
const querystring_1 = __importDefault(require("querystring"));
const ts_md5_1 = require("ts-md5");
class JDClient {
    constructor(clientConfig) {
        this.appKey = clientConfig.appKey;
        this.secretKey = clientConfig.secretKey;
        this.endpoint = clientConfig.endpoint || 'https://api.jd.com/routerjson';
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
        return ts_md5_1.Md5.hashStr(plainString).toUpperCase();
    }
    async execute(method, input) {
        const params = {
            method,
            v: '1.0',
            format: 'json',
            sign_method: 'md5',
            app_key: this.appKey,
            timestamp: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss'),
        };
        params['360buy_param_json'] = JSON.stringify(input);
        params['sign'] = this.sign(params);
        const response = await axios_1.default.post(this.endpoint, querystring_1.default.stringify(params));
        const responseData = response.data;
        if (responseData['error_response']) {
            const error = responseData['error_response'];
            return {
                code: parseInt(error.code),
                message: error.zh_desc
            };
        }
        const field = `${method.replace(/\./g, '_')}_responce`;
        const result = responseData[field];
        result['queryResult'] = JSON.parse(result['queryResult']);
        return result;
    }
}
exports.JDClient = JDClient;
