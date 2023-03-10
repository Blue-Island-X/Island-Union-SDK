const union = require('../../island-union-sdk');

const client = new union.jd.Client({
    appKey: '********************************',
    secretKey: '********************************'
});

client.execute('jd.union.open.goods.promotiongoodsinfo.query', { skuIds: '100052255527' }).then(result => {
    const goods = JSON.parse(result.queryResult).data[0];
    console.log(`[*] 商品名称: ${goods.goodsName}`);
    console.log(`[*] 商品封面: ${goods.imgUrl}`);
    console.log(`[*] 商品价格: ${goods.unitPrice}`);
});