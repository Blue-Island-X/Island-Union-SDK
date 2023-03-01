<h1 align="center">
    <b>
        <a href="https://github.com/Blue-Island-X"><img style="width:128px;" src="https://raw.githubusercontent.com/Blue-Island-X/Island-Union-SDK/main/resource/logo.png" /></a><br>
    </b>
</h1>

<p align="center">小蓝岛购物平台联盟聚合 SDK</p>

<div align="center">

[![npm version](https://img.shields.io/npm/v/@blueislandx/island-union-sdk.svg?style=flat-square)](https://www.npmjs.org/package/@blueislandx/island-union-sdk)
[![install size](https://img.shields.io/badge/dynamic/json?url=https://packagephobia.com/v2/api.json?p=@blueislandx/island-union-sdk&query=$.install.pretty&label=install%20size&style=flat-square)](https://packagephobia.now.sh/result?p=@blueislandx/island-union-sdk)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/@blueislandx/island-union-sdk?style=flat-square)](https://bundlephobia.com/package/@blueislandx/island-union-sdk@latest)
[![npm downloads](https://img.shields.io/npm/dm/@blueislandx/island-union-sdk.svg?style=flat-square)](https://npm-stat.com/charts.html?package=@blueislandx/island-union-sdk)
[![Known Vulnerabilities](https://snyk.io/test/npm/@blueislandx/island-union-sdk/badge.svg?style=flat-square)](https://snyk.io/test/npm/@blueislandx/island-union-sdk)

</div>

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
npm i @blueislandx/island-union-sdk --save
```

## 2.如何使用
- 1.淘宝联盟 [文档](https://open.taobao.com/api.htm?docId=24518&docType=2)
```TypeScript
import union from '@blueislandx/island-union-sdk';

const client = new union.taobao.Client({
    appKey: '<你的 AppKey>',
    secretKey: '<你的 SecretKey>'
});

const result = await client.execute('<API 方法名称>', { <业务参数> });
```

> P.S: 淘宝联盟接口必须传入字符 id, 数字 id 已经下线无法使用

- 2.京东联盟 [文档](https://union.jd.com/openplatform/api/v2)
```TypeScript
import union from '@blueislandx/island-union-sdk';

const client = new union.jd.Client({
    appKey: '<你的 AppKey>',
    secretKey: '<你的 SecretKey>'
});

const result = await client.execute('<API 方法名称>', { <业务参数> });
```

- 3.多多进宝 [文档](https://open.pinduoduo.com/application/document/api?id=pdd.ddk.goods.pid.generate)

```TypeScript
import union from '@blueislandx/island-union-sdk';

const client = new union.pinduoduo.Client({
    appKey: '<你的 ClientId>',
    secretKey: '<你的 ClientSecret>'
});

const result = await client.execute('<API 方法名称>', { <业务参数> });
```

> P.S: 多多进宝接口必须传入 goods_sign (字符 id), goods_id (数字 id) 已经下线无法使用

- 4.苏宁联盟 [文档](https://open.suning.com/ospos/apipage/toApiMethodDetailMenuNew.do?bustypeId=3)

```TypeScript
import union from '@blueislandx/island-union-sdk';

const client = new union.suning.Client({
    appKey: '<你的 AppKey>',
    secretKey: '<你的 AppSecret>'
});

const result = await client.execute('<API 方法名称>', { <业务参数> });
```

- 5.唯品会联盟 [文档](https://vop.vip.com/home#/api/service/list/2)

```TypeScript
import union from '@blueislandx/island-union-sdk';

const client = new union.vip.Client({
    appKey: '<你的 AppKey>',
    secretKey: '<你的 AppSecret>'
});

const result = await client.execute('<API 服务名称>', '<API 服务版本>', '<API 方法名称>', { <业务参数> });
```

- 6.考拉联盟 [文档](https://kaola-haitao.oss.kaolacdn.com/a5b08dbc-e7ae-4464-9d5d-e55cdc78f121.docx?spm=a2v0d.b9947081.0.0.12fc2fbc2WT1tV&file=a5b08dbc-e7ae-4464-9d5d-e55cdc78f121.docx)
```TypeScript
import union from '@blueislandx/island-union-sdk';

const client = new union.kaola.Client({
    secretKey: '<你的 AppSecret>',
    unionId: '<你的赚客 Id>'
});

const result = await client.execute('<API 接口名称>', { <业务参数> });
```

- 7.有赞联盟 [文档](https://doc.youzanyun.com/list/API/1303) [指南](https://shimo.im/docs/tTwjdRYDcHvDdvQ9/read)
```TypeScript
import union from '@blueislandx/island-union-sdk';

const client = new union.youzan.Client({
    appKey: '<你的 AppKey>',
    secretKey: '<你的 AppSecret>',
    grantId: '<你的有赞客 Id>'
});

const result = await client.execute('<API 接口名称>', '<API 接口版本>', { <业务参数> });
```

## 3.错误处理

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

## 4.重大变更

自 ``1.1.0`` 起, 导入名称由 ``island`` 改为 ``union``

> P.S: 该改动是由于公司内部业务模块化, 全部使用 ``island`` 会导致混乱