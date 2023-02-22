const union = require('../../island-union-sdk');

const client = new union.taobao.Client({
    appKey: '********',
    secretKey: '********************************'
});

client.execute('taobao.tbk.item.info.get', { num_iids: 'jGDpnGWs0ty0vMKtN52TJte-e5yxZK0CGonBk6Gyczo' }).then(result => {
    const goods = result.results.n_tbk_item[0];
    console.log(`[*] 商品名称: ${goods.title}`);
    console.log(`[*] 商品封面: ${goods.pict_url}`);
    console.log(`[*] 商品价格: ${goods.reserve_price}`);
});