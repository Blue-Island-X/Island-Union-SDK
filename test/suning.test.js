const union = require('../../island-union-sdk');

const client = new union.suning.Client({
    appKey: '********************************',
    secretKey: '********************************'
});

client.execute('suning.netalliance.unioninfomation.get', { goodsCode: '000000012389328919' }).then(result => {
    const goods = result[0];
    console.log(`[*] 商品名称: ${goods.goodsName}`);
    console.log(`[*] 商品封面: ${goods.pictureUrl}`);
    console.log(`[*] 商品价格: ${goods.price}`);
});