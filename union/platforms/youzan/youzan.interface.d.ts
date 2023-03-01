import { ClientConfig } from '../../common/interfaces';
export interface YouzanClientConfig extends ClientConfig {
    /**
     * @param {grantId} 推广者 Id
     * 必选
     */
    grantId: string;
}
