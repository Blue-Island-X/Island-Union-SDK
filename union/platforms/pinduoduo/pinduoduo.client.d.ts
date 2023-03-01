import { PinduoduoClientConfig } from './pinduoduo.interface';
export declare class PinduoduoClient {
    appKey: string;
    secretKey: string;
    endpoint: string;
    constructor(clientConfig: PinduoduoClientConfig);
    sign(params: object): string;
    execute(method: string, input: object): Promise<any>;
}
