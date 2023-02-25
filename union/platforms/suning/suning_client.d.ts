import { ClientConfig } from '../../common/interfaces';
export declare class SuningClient {
    appKey: string;
    secretKey: string;
    endpoint: string;
    constructor(clientConfig: ClientConfig);
    sign(secretKey: string, method: string, time: string, appKey: string, version: string, content: object): string;
    execute(method: string, input: object): Promise<any>;
}
