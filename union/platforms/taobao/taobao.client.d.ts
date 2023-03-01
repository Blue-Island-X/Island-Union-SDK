import { TaobaoClientConfig } from './taobao.interface';
export declare class TaobaoClient {
    appKey: string;
    secretKey: string;
    endpoint: string;
    constructor(clientConfig: TaobaoClientConfig);
    sign(params: object): string;
    execute(method: string, input: object): Promise<any>;
}
