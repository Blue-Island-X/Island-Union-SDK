import axios from 'axios';
import moment from 'moment';
import { Md5 } from 'ts-md5';
import { ClientConfig } from '../../common/interfaces';

export class JDClient {
    appKey: string;
    secretKey: string;
    endpoint: string;

    constructor(clientConfig: ClientConfig) {
        this.appKey = clientConfig.appKey;
        this.secretKey = clientConfig.secretKey;
        this.endpoint = clientConfig.endpoint || 'https://api.jd.com/routerjson';
    }

    sign(params: object) {
        const sortedKeys = Object.keys(params).sort();

        var plainString = '';
        for (var i = 0; i < sortedKeys.length; i++) {
            const key = sortedKeys[i];
            const value = params[key as keyof typeof params];
            plainString += key + value;
        }
        plainString = this.secretKey + plainString + this.secretKey;

        return Md5.hashStr(plainString).toUpperCase();
    }

    async execute(method: string, data: object) {
        const params : any = {
            method,
            v: '1.0',
            format: 'json',
            sign_method: 'md5',
            app_key: this.appKey,
            timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
        };
        params['360buy_param_json'] = JSON.stringify(data);
        params['sign'] = this.sign(params);

        const response = await axios.get(this.endpoint, { params });
        const responseData = response.data;

        if (responseData['error_response']) {
            const error = responseData['error_response'];

            return {
                code: parseInt(error.code),
                message: error.zh_desc
            }
        }

        const field = `${method.replace(/\./g, '_')}_responce`;
        const result = responseData[field];

        result['queryResult'] = JSON.parse(result['queryResult']);

        return result;
    }
}