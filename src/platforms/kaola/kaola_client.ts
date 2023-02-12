import axios from 'axios';
import moment from 'moment';
import md5 from 'crypto-js/md5';

import { DataUtil } from '../../common/data';
import { ClientConfig } from '../../common/interfaces';

export class KaolaClient {
    secretKey: string;
    unionId: string;
    endpoint: string;

    constructor(clientConfig: ClientConfig) {
        this.secretKey = clientConfig.secretKey;
        this.unionId = clientConfig.unionId;
        this.endpoint = clientConfig.endpoint || 'https://cps.kaola.com/zhuanke/api';
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

        return md5(plainString).toString().toUpperCase();
    }

    async execute(method: string, input: object) {
        const headers = {
            Accept: 'application/json;charset=UTF-8'
        };
        const params : any = {
            method,
            v: '1.0',
            signMethod: 'md5',
            unionId: this.unionId,
            timestamp: moment().format('YYYY-MM-DD HH:mm:ss')
        };
        params['sign'] = this.sign(Object.assign({}, params, input));

        const response = await axios.post(this.endpoint, DataUtil.object2FormData(input), { params, headers });
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