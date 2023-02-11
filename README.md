# 小蓝岛联盟聚合 SDK

本 SDK 支持以下购物平台联盟:
- [淘宝联盟](https://aff-open.taobao.com) [HMAC-SHA256]
- [京东联盟](https://union.jd.com)
- [多多进宝](https://jinbao.pinduoduo.com)
- [苏宁联盟](https://sums.suning.com)
- [唯品会联盟](https://union.vip.com) [HMAC-MD5]
- [考拉联盟](https://pub.kaola.com)
- [有赞联盟](https://www.youzan.com/intro/zanke) [N/A]

> P.S: 若没有特别标注, 所有签名算法均使用 [MD5](https://en.wikipedia.org/wiki/MD5) 实现

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

const result = await client.execute('<API 方法名称>', { <业务参数> });
```

> P.S: 淘宝联盟接口必须传入字符 id, 数字 id 已经下线无法使用

- 2.京东联盟 [文档](https://union.jd.com/openplatform/api/v2)
```TypeScript
import island from 'island-union-sdk';

const client = new island.jd.Client({
    appKey: '<你的 AppKey>',
    secretKey: '<你的 SecretKey>'
});

const result = await client.execute('<API 方法名称>', { <业务参数> });
```

- 3.多多进宝 [文档](https://open.pinduoduo.com/application/document/api?id=pdd.ddk.goods.pid.generate)

```TypeScript
import island from 'island-union-sdk';

const client = new island.pinduoduo.Client({
    appKey: '<你的 ClientId>',
    secretKey: '<你的 ClientSecret>'
});

const result = await client.execute('<API 方法名称>', { <业务参数> });
```

> P.S: 多多进宝接口必须传入 goods_sign (字符 id), goods_id (数字 id) 已经下线无法使用

- 4.苏宁联盟 [文档](https://open.suning.com/ospos/apipage/toApiMethodDetailMenuNew.do?bustypeId=3)

```TypeScript
import island from 'island-union-sdk';

const client = new island.suning.Client({
    appKey: '<你的 AppKey>',
    secretKey: '<你的 AppSecret>'
});

const result = await client.execute('<API 方法名称>', { <业务参数> });
```

- 5.唯品会联盟 [文档](https://vop.vip.com/home#/api/service/list/2)

```TypeScript
import island from 'island-union-sdk';

const client = new island.vip.Client({
    appKey: '<你的 AppKey>',
    secretKey: '<你的 AppSecret>'
});

const result = await client.execute('<API 服务名称>', '<API 服务版本>', '<API 方法名称>', { <业务参数> });
```

- 6.考拉联盟 [文档](https://kaola-haitao.oss.kaolacdn.com/a5b08dbc-e7ae-4464-9d5d-e55cdc78f121.docx?spm=a2v0d.b9947081.0.0.12fc2fbc2WT1tV&file=a5b08dbc-e7ae-4464-9d5d-e55cdc78f121.docx)
```TypeScript
import island from 'island-union-sdk';

const client = new island.kaola.Client({
    secretKey: '<你的 AppSecret>',
    unionId: '<你的赚客 Id>'
});

const result = await client.execute('<API 接口名称>', { <业务参数> });
```

- 7.有赞联盟 [文档](https://doc.youzanyun.com/list/API/1303) [指南](https://shimo.im/docs/tTwjdRYDcHvDdvQ9/read)
```TypeScript
import island from 'island-union-sdk';

const client = new island.youzan.Client({
    appKey: '<你的 AppKey>',
    secretKey: '<你的 AppSecret>',
    unionId: '<你的有赞客 Id>'
});

const result = await client.execute('<API 接口名称>', '<API 接口版本>', { <业务参数> });
```

## 3.注意事项

如果 SDK 请求错误会返回如下格式:
```JSON
{
    "code": <错误代码>,
    "message": "<错误信息>",
    "error": true
}
```

> P.S: 判断一个请求是否失败, 请使用 ``error`` 字段而不是使用 ``code`` 字段

> P.S: 错误代码 **不一定** 是整数类型, 请不要 ``parseInt``, SDK 内部已经对字符串的数字进行了处理
