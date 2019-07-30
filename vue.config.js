const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
module.exports = {
  devServer: {
    proxy: {
      '/mltd': {
        target: 'https://api.matsurihi.me/mltd/v1/',
        changeOrigin: true,
        pathRewrite: { '^/mltd': '' }
      },
      '/my-mltd': {
        target: 'https://mltd-api.dovahkiin.top/.netlify/functions/server',
        changeOrigin: true,
        pathRewrite: { '^/my-mltd': '' }
      },
      '/storage': {
        target: 'https://storage.matsurihi.me/mltd',
        changeOrigin: true,
        pathRewrite: { '^/storage': '' }
      },
    }
  },
  productionSourceMap: false
}