const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
module.exports = {
  devServer: {
    proxy: {
      '/version': {
        target: 'https://api.matsurihi.me/mltd/v1/version/latest',
        ws: true,
        changeOrigin: true,
        pathRewrite: { '^/mltd': '' }
      },
      '/my-mltd': {
        target: 'https://mltd-api.dovahkiin.top/.netlify/functions/server',
        ws: true,
        changeOrigin: true,
        pathRewrite: { '^/my-mltd': '' }
      },
    }
  },
  productionSourceMap: false
}