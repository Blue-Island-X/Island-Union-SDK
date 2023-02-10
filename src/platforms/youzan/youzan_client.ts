import axios from 'axios';
import moment from 'moment';

import { ClientConfig } from '../../common/interfaces';

export class YouzanClient {
    appKey: string;
    secretKey: string;
    grantId: string;
    endpoint: string;
    accessToken: string;
    refreshToken: string;
    tokenExpire: number;

    constructor(clientConfig: ClientConfig) {
        this.appKey = clientConfig.appKey;
        this.secretKey = clientConfig.secretKey;
        this.grantId = clientConfig.unionId;
        this.endpoint = clientConfig.endpoint || 'https://open.youzanyun.com';
        this.accessToken = '';
        this.refreshToken = '';
        this.tokenExpire = -1;
    }

    private async getToken(refresh: boolean = false) {
        let data;

        if (refresh) {
            data = {
                client_id: this.appKey,
                client_secret: this.secretKey,
                refresh_token: this.refreshToken,
                authorize_type: 'refresh_token'
            };
        } else {
            data = {
                refresh: true,
                grant_id: this.grantId,
                grant_type: 'youzanke',
                client_id: this.appKey,
                client_secret: this.secretKey,
                authorize_type: 'silent'
            };
        }

        const response = await axios.post(`${this.endpoint}/auth/token`, data);
        return response.data;
    }

    async execute(method: string, version: string, input: object) {
        const tokenExpired = this.tokenExpire !== -1 && moment().unix() - 86400 >= this.tokenExpire ? true : false;
        if (this.tokenExpire === -1 || tokenExpired) {
            const tokenResult = await this.getToken(tokenExpired);
            if (tokenResult.success) {
                const tokenInfo = tokenResult.data;

                this.accessToken = tokenInfo.access_token;
                this.refreshToken = tokenInfo.refresh_token
                this.tokenExpire = tokenInfo.expires;
            } else {
                return {
                    code: tokenResult.code,
                    message: tokenResult.message,
                    error: true
                };
            }
        }

        const params = {
            access_token: this.accessToken
        };
        const response = await axios.post(`${this.endpoint}/api/${method}/${version}`, input, { params });
        const responseData = response.data;

        if (responseData.gw_err_resp) {
            const error = responseData.gw_err_resp;

            return {
                code: error.err_code,
                message: error.err_msg,
                error: true
            };
        }
        
        if (responseData.success === false) {
            return {
                code: responseData.code,
                message: responseData.message,
                error: true
            };
        }

        return responseData.data;
    }
}