import { YouzanClientConfig } from './youzan.interface';
export declare class YouzanClient {
    appKey: string;
    secretKey: string;
    grantId: string;
    endpoint: string;
    accessToken: string;
    refreshToken: string;
    tokenExpire: number;
    constructor(clientConfig: YouzanClientConfig);
    private getToken;
    execute(method: string, version: string, input: object): Promise<any>;
}
