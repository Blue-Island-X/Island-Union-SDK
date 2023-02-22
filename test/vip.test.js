const uuid = require('uuid');
const union = require('../../island-union-sdk');

const client = new union.vip.Client({
    appKey: '********',
    secretKey: '********************************'
});

client.execute('com.vip.adp.api.open.service.UnionGoodsService', '1.0.0', 'getByGoodsIdsV2', { request: { goodsIds: ['6920036335061544006'], requestId: uuid.v4() } }).then(result => {
    const goods = result[0];
    console.log(`[*] 商品名称: ${goods.goodsName}`);
    console.log(`[*] 商品封面: ${goods.goodsMainPicture}`);
    console.log(`[*] 商品价格: ${goods.vipPrice}`);
});