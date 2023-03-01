import { ClientConfig } from '../../common/interfaces';
export interface KaolaClientConfig extends ClientConfig {
    /**
     * @param {unionId} 推广者 Id
     * 必选
     */
    unionId: string;
}
