import { KaolaClientConfig } from './kaola.interface';
export declare class KaolaClient {
    secretKey: string;
    unionId: string;
    endpoint: string;
    constructor(clientConfig: KaolaClientConfig);
    sign(params: object): string;
    execute(method: string, input: object): Promise<any>;
}
