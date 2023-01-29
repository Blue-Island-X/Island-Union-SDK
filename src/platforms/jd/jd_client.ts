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
        this.endpoint = clientConfig.endpoint || 'https://router.jd.com/api';
    }

    sign(params: object) {
        const sortedKeys = Object.keys(params).sort();

        var plainString = '';
        for (var i = 0; i < sortedKeys.length; i++) {
            const key = sortedKeys[i];
            const value = params[key];
            plainString += key + value;
        }
        plainString = this.secretKey + plainString + this.secretKey;
        
        return Md5.hashStr(plainString).toUpperCase();
    }

    async execute(method: string, data: object) {
        const params = {
            method,
            v: '2.0',
            format: 'json',
            sign_method: 'md5',
            app_key: this.appKey,
            timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
        };
        params['360buy_param_json'] = data;
        params['sign'] = this.sign(params);

        const response = await axios.get(this.endpoint, { params });
    }
}