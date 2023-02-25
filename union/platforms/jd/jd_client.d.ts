import { ClientConfig } from '../../common/interfaces';
export declare class JDClient {
    appKey: string;
    secretKey: string;
    endpoint: string;
    constructor(clientConfig: ClientConfig);
    sign(params: object): string;
    execute(method: string, input: object): Promise<any>;
}
