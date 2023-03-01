import { ClientConfig } from '../../common/interfaces';
export interface KaolaClientConfig extends Omit<ClientConfig, 'appKey'> {
    /**
     * @param {unionId} 推广者 Id
     * 必选
     */
    unionId: string;
}
