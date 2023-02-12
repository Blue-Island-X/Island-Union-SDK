"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KaolaClient = void 0;
const axios_1 = __importDefault(require("axios"));
const moment_1 = __importDefault(require("moment"));
const md5_1 = __importDefault(require("crypto-js/md5"));
const data_1 = require("../../common/data");
class KaolaClient {
    constructor(clientConfig) {
        this.secretKey = clientConfig.secretKey;
        this.unionId = clientConfig.unionId;
        this.endpoint = clientConfig.endpoint || 'https://cps.kaola.com/zhuanke/api';
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
        const headers = {
            Accept: 'application/json;charset=UTF-8'
        };
        const params = {
            method,
            v: '1.0',
            signMethod: 'md5',
            unionId: this.unionId,
            timestamp: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')
        };
        params['sign'] = this.sign(Object.assign({}, params, input));
        const response = await axios_1.default.post(this.endpoint, data_1.DataUtil.object2FormData(input), { params, headers });
        const responseData = response.data;
        if (responseData.code !== 200) {
            return {
                code: responseData.code,
                message: responseData.msg,
                error: true
            };
        }
        return responseData.data;
    }
}
exports.KaolaClient = KaolaClient;
