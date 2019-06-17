module.exports = {
    devServer: {
        proxy: {
          '/mltd': {
            target: 'https://api.matsurihi.me/mltd/v1',
            ws: true,
            changeOrigin: true,
            pathRewrite: {'^/mltd' : ''}
            },
          '/my-mltd': {
            target: 'https://mltd-api.dovahkiin.top/.netlify/functions/server',
            ws: true,
            changeOrigin: true,
            pathRewrite: {'^/my-mltd' : ''}
            },
        }
    },
    productionSourceMap:false,  
}