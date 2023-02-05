"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuningClient = void 0;
const axios_1 = __importDefault(require("axios"));
const moment_1 = __importDefault(require("moment"));
const ts_md5_1 = require("ts-md5");
const suning_util_1 = require("./suning_util");
class SuningClient {
    constructor(clientConfig) {
        this.appKey = clientConfig.appKey;
        this.secretKey = clientConfig.secretKey;
        this.endpoint = clientConfig.endpoint || 'https://open.suning.com/api/http/sopRequest';
    }
    sign(secretKey, method, time, appKey, version, content) {
        const plainString = `${secretKey}${method}${time}${appKey}${version}${Buffer.from(JSON.stringify(content)).toString('base64')}`;
        return ts_md5_1.Md5.hashStr(plainString).toLowerCase();
    }
    async execute(method, input) {
        const field = suning_util_1.SuningUtil.getBizName(method);
        const data = {
            sn_request: {
                sn_body: {
                    [field]: input
                }
            }
        };
        const headers = {
            format: 'json',
            versionNo: 'v1.2',
            appMethod: method,
            appKey: this.appKey,
            appRequestTime: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')
        };
        headers['signInfo'] = this.sign(this.secretKey, method, headers['appRequestTime'], this.appKey, headers['versionNo'], data);
        const response = await axios_1.default.post(this.endpoint, data, { headers });
        const responseData = response.data;
        if (responseData['sn_responseContent']['sn_error']) {
            const error = responseData['sn_responseContent']['sn_error'];
            return {
                code: error['error_code'],
                message: error['error_msg']
            };
        }
        return responseData['sn_responseContent']['sn_body'][field];
    }
}
exports.SuningClient = SuningClient;
