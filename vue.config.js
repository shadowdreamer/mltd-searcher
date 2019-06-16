module.exports = {
    devServer: {
        proxy: {
          '/mltd': {
            target: 'https://api.matsurihi.me/mltd/v1',
            ws: true,
            changeOrigin: true,
            pathRewrite: {'^/mltd' : ''}
            }
        }
    },
    productionSourceMap:false,  
}