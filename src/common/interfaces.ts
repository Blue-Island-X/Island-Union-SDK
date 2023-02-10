/**
 * 初始化 Client 对象参数类型
 */
export interface ClientConfig {
    /**
     * @param {appKey} 调用接口使用
     * 必选
     */
    appKey: string;

    /**
     * @param {secretKey} 用于 API 对接的唯一密匙，请勿外泄
     * 必选
     */
    secretKey: string;

    /**
     * @param {grantId} 推广者 Id
     * 仅考拉海购和有赞平台需要传入。
     */
    unionId: string;

    /**
     * @param {endpoint} API 接口地址
     * 可选, 若 API 接口地址变更则需要传入。
     */
    endpoint?: string; 
}