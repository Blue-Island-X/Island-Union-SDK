const island = require('../../island-union-sdk');

const client = new island.pinduoduo.Client({
    appKey: '********************************',
    secretKey: '********************************'
});

client.execute('pdd.ddk.goods.detail', { goods_sign: 'E9b2xfbV6gdlVXSRwfjbizJe7UujqtpJyg_JQxlFzlDxm', pid: '********_*********' }).then(result => {
    const goods = result.goods_details[0];
    console.log(`[*] 商品名称: ${goods.goods_name}`);
    console.log(`[*] 商品封面: ${goods.goods_image_url}`);
    console.log(`[*] 商品价格: ${goods.min_group_price / 100}`);
});