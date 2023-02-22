const union = require('../../island-union-sdk');

const client = new union.youzan.Client({
    appKey: '******************',
    secretKey: '********************************',
    grantId: '**********'
});

client.execute('youzan.yzk.independent.goods.detail.get', '1.0.0', { alias: '361ls6y3xpgm5' }).then(result => {
    const goods = result;
    console.log(`[*] 商品名称: ${goods.name}`);
    console.log(`[*] 商品封面: ${goods.image_list[0].image_url}`);
    console.log(`[*] 商品价格: ${goods.price / 100}`);
});