import axios from 'axios';
import moment from 'moment';
import querystring from 'querystring';

import { Md5 } from 'ts-md5';
import { ClientConfig } from '../../common/interfaces';

export class TaobaoClient {
    appKey: string;
    secretKey: string;
    endpoint: string;
    
    constructor(clientConfig: ClientConfig) {
        this.appKey = clientConfig.appKey;
        this.secretKey = clientConfig.secretKey;
        this.endpoint = clientConfig.endpoint || 'https://eco.taobao.com/router/rest';
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

    async execute(method: string, input: object) {
        const params : any = {
            method,
            v: '2.0',
            format: 'json',
            sign_method: 'md5',
            app_key: this.appKey,
            timestamp: moment().unix()
        };
        params['sign'] = this.sign(Object.assign({}, params, input));

        const response = await axios.post(this.endpoint, querystring.stringify(input as any), { params });
        const responseData = response.data;

        if (responseData['error_response']) {
            const error = responseData['error_response'];

            return {
                code: parseInt(error['code']),
                message: error['msg']
            };
        }

        let field : string;
        if (method.startsWith('taobao.')) {
            field = `${method.substring(7).replace(/\./g, '_')}_response`;
        } else {
            field = `${method.replace(/\./g, '_')}_response`;
        }

        return responseData[field];
    }
}