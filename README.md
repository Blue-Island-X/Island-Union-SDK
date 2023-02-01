# 小蓝岛联盟聚合 SDK

本 SDK 支持以下购物平台联盟:
- [淘宝联盟](https://aff-open.taobao.com)
- [京东联盟](https://union.jd.com)
- [苏宁联盟](https://sums.suning.com)

## 1.如何安装
```
npm i island-union-sdk --save
```

## 2.如何使用
- 1.淘宝联盟 [文档](https://open.taobao.com/api.htm?docId=24518&docType=2)
```TypeScript
import island from 'island-union-sdk';

const client = new island.taobao.Client({
    appKey: '<你的 AppKey>',
    secretKey: '<你的 SecretKey>'
});

const result = await client.execute('<API 接口名称>', { <业务参数> });
```

- 2.京东联盟 [文档](https://union.jd.com/openplatform/api/v2)
```TypeScript
import island from 'island-union-sdk';

const client = new island.jd.Client({
    appKey: '<你的 AppKey>',
    secretKey: '<你的 SecretKey>'
});

const result = await client.execute('<API 接口名称>', { <业务参数> });
```

- 3.苏宁联盟 [文档](https://open.suning.com/ospos/apipage/toApiMethodDetailMenuNew.do?bustypeId=3)

```TypeScript
import island from 'island-union-sdk';

const client = new island.suning.Client({
    appKey: '<你的 AppKey>',
    secretKey: '<你的 AppSecret>'
});

const result = await client.execute('<API 接口名称>', { <业务参数> });
```
