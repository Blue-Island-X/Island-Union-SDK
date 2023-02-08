import qs from 'qs';
import axios from 'axios';
import moment from 'moment';
import md5 from 'crypto-js/md5';

import { ClientConfig } from '../../common/interfaces';
import { PinduoduoUtil } from './pinduoduo_util';

export class PinduoduoClient {
    appKey: string;
    secretKey: string;
    endpoint: string;

    constructor(clientConfig: ClientConfig) {
        this.appKey = clientConfig.appKey;
        this.secretKey = clientConfig.secretKey;
        this.endpoint = clientConfig.endpoint || 'https://gw-api.pinduoduo.com/api/router';
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
        const params : any = {
            type: method,
            version: 'V1',
            data_type: 'JSON',
            client_id: this.appKey,
            timestamp: moment().unix(),
        };
        params['sign'] = this.sign(Object.assign({}, params, input));

        const response = await axios.post(this.endpoint, qs.stringify(input), { params });
        const responseData = response.data;

        if (responseData['error_response']) {
            const error = responseData['error_response'];

            return {
                code: error['error_code'],
                message: `${error['error_msg']}: ${error['sub_msg']}`,
                error: true
            };
        }

        const field = PinduoduoUtil.getBizName(method);
        if (field !== null) {
            return responseData[field];
        } else {
            return responseData;
        }
    }
}