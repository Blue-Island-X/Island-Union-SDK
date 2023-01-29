/**
 * 初始化client对象参数类型
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
     * @param {endpoint} API 接口地址
     * 可选, 若 API 接口地址变更则需要传入。
     */
    endpoint?: string; 
}