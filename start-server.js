// const createApp = require('/path/to/built-server-bundle.js')
// const Koa = require('koa')
const fs = require('fs')
const path = require('path')
const server = require('express')()
const { createBundleRenderer } = require('vue-server-renderer')

const LRU = require('lru-cache')

const resolve = file => path.resolve(__dirname, file)

// 生成服务端渲染函数
const options = {
  runInNewContext: false,
  template: fs.readFileSync(resolve('./index.html'), 'utf-8'),
  clientManifest: require('./dist/vue-ssr-client-manifest.json')
}
const renderer = createBundleRenderer(require('./dist/vue-ssr-server-bundle.json', options))

server.get('*', (req, res) => {
  const context = { 
    title: '服务端渲染ssr test',
    url: req.url 
  }
  renderer.renderToString(context, (err, html) => {
    if (err) {
      if (err.code === 404) {
        res.status(404).end('Page not found')
      } else {
        res.status(500).end('Internal Server Error' + err)
      }
    } else {
      res.end(html)
    }
  })
})

server.listen(8999)