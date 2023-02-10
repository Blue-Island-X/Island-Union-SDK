const island = require('../../island-union-sdk');

const client = new island.kaola.Client({
    secretKey: '************************************',
    unionId: 'zhuanke_*********'
});

client.execute('kaola.zhuanke.api.queryGoodsInfo', { goodsIds: '12049808' }).then(result => {
    const goods = result[0];
    console.log(`[*] 商品名称: ${goods.baseInfo.goodsTitle}`);
    console.log(`[*] 商品封面: ${goods.baseInfo.imageList[0]}`);
    console.log(`[*] 商品价格: ${goods.priceInfo.currentPrice}`);
});