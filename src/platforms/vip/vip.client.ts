import axios from 'axios';
import moment from 'moment';
import hmacMD5 from 'crypto-js/hmac-md5';

import { VipClientConfig } from './vip.interface';

export class VipClient {
    appKey: string;
    secretKey: string;
    endpoint: string;

    constructor(clientConfig: VipClientConfig) {
        this.appKey = clientConfig.appKey;
        this.secretKey = clientConfig.secretKey;
        this.endpoint = clientConfig.endpoint || 'https://vop.vipapis.com';
    }

    sign(params: object, input: object) {
        const sortedKeys = Object.keys(params).sort();

        var plainString = '';
        for (var i = 0; i < sortedKeys.length; i++) {
            const key = sortedKeys[i];
            const value = params[key as keyof typeof params];
            plainString += key + value;
        }
        plainString += JSON.stringify(input);
        return hmacMD5(plainString, this.secretKey).toString().toUpperCase();
    }

    async execute(service: string, version: string, method: string, input: object) {
        const params : any = {
            method,
            service,
            version,
            format: 'json',
            appKey: this.appKey,
            timestamp: moment().unix()
        };
        params['sign'] = this.sign(params, input);

        const response = await axios.post(this.endpoint, input, { params });
        const responseData = response.data;

        if (responseData.returnCode && responseData.returnMessage) {
            return {
                code: responseData.returnCode,
                message: responseData.returnMessage,
                error: true
            };
        }

        return responseData.result;
    }
}