import { JDClientConfig } from './jd.interface';
export declare class JDClient {
    appKey: string;
    secretKey: string;
    endpoint: string;
    constructor(clientConfig: JDClientConfig);
    sign(params: object): string;
    execute(method: string, input: object): Promise<any>;
}
