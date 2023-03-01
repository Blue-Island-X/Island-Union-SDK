import { VipClientConfig } from './vip.interface';
export declare class VipClient {
    appKey: string;
    secretKey: string;
    endpoint: string;
    constructor(clientConfig: VipClientConfig);
    sign(params: object, input: object): string;
    execute(service: string, version: string, method: string, input: object): Promise<any>;
}
