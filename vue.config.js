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
      //https://webview-dot-theaterdays.appspot.com/api/info?type=3&cursor=&platform=google
      '/news-mltd':{
        target:'https://mltd.dovahkiin.top/news-mltd',
        changeOrigin: true,
        pathRewrite: { '^/news-mltd': '' }
      },
      '/news-img':{
        target:'https://mltd.dovahkiin.top/news-img',
        changeOrigin: true,
        pathRewrite: { '^/news-img': '' }
      },
    }
  },
  pwa:{
    themeColor:'#a6126a',
    msTileColor:"#a6126a",
    iconPaths:{
      favicon32: 'icons/logo-32.png',
      favicon16: 'icons/logo-16.png',
      appleTouchIcon: 'icons/apple-touch-icon-152x152.png',
      msTileImage: 'icons/logo-144.png'
    }
  },
  productionSourceMap: false
}