import axios from 'axios'
import moment from 'moment';

import { Md5 } from 'ts-md5';
import { SuningUtil } from './suning_util';
import { ClientConfig } from '../../common/interfaces';

export class SuningClient {
    appKey: string;
    secretKey: string;
    endpoint: string;

    constructor(clientConfig: ClientConfig) {
        this.appKey = clientConfig.appKey;
        this.secretKey = clientConfig.secretKey;
        this.endpoint = clientConfig.endpoint || 'https://open.suning.com/api/http/sopRequest';
    }
    
    sign(secretKey: string, method: string, time: string, appKey: string, version: string, content: object) {
        const plainString = `${secretKey}${method}${time}${appKey}${version}${Buffer.from(JSON.stringify(content)).toString('base64')}`;
        return Md5.hashStr(plainString).toLowerCase();
    }

    async execute(appMethod: string, input: object) {
        const headers : any = {
            appMethod,
            format: 'json',
            versionNo: 'v1.2',
            appKey: this.appKey,
            appRequestTime: moment().format('YYYY-MM-DD HH:mm:ss')
        };

        const field = SuningUtil.getBizName(appMethod);
        const data = { sn_request: { sn_body: { [field]: input } } };

        headers['signInfo'] = this.sign(this.secretKey, appMethod, headers['appRequestTime'], this.appKey, headers['versionNo'], data);

        const response = await axios.post(this.endpoint, data, { headers });
        const responseData = response.data;

        if (responseData['sn_responseContent']['sn_error']) {
            const error = responseData['sn_responseContent']['sn_error'];

            return {
                code: error['error_code'],
                message: error['error_msg']
            }
        }

        return responseData['sn_responseContent']['sn_body'][field];
    }
}