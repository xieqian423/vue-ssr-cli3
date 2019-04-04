/* eslint-disable indent */

const webpack = require('webpack')
const axios = require('axios')
const MemoryFS = require('memory-fs')
const fs = require('fs')
const path = require('path')
const Router = require('koa-router')

// 1. weboack配置文件
const webpackConfig = require('@vue/cli-service/webpack.config')
const { createBundleRenderer } = require('vue-server-renderer')

// 2.编译webpack配置文件
const serverCompiler = webpack(webpackConfig)
const mfs = new MemoryFS()

// 指定输出文件到内存流中
serverCompiler.outputFileSystem = mfs

// 3.监听文件修改,实时编译获取最新的 vue-ssr-server-bundle.json
let bundle
serverCompiler.watch({}, (err, stats) => {
    if (err) {
        throw err
    }
    stats = stats.toJson()
    stats.errors.forEach(error => console.log(error))
    stats.warnings.forEach(warn => console.log(warn))
    const bundlePath = path.join(
        webpackConfig.output.path,
        'vue-ssr-server-bundle.json'
    )

    console.log('--------------' + bundlePath)
    try {
        bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))
        console.log('new bundle generated')
    } catch (err) {
        bundle = null
        console.log('----------' + '读取bundle出错')
    } finally {
        
    }
})

const handleRequest = async (ctx) => {
    console.log('path--', ctx.path)
    if (!bundle) {
        ctx.body = '等待webpack打包完成后在访问'
        return
    }
 
    // 4. 获取最新的 vue-ssr-client-manifest.json
    console.log('~~~~~~axios')
    const clientManifestResp = await axios.get('http://localhost:8080/vue-ssr-client-manifest.json')
    console.log('~~~~~~axios end')
    const clientManifest = clientManifestResp.data
    console.log('~~~~~~' + clientManifest)

    const renderer = createBundleRenderer(bundle, {
        runInNewContext: false,
        template: fs.readFileSync(path.resolve(__dirname, "../index.html"), "utf-8"),
        clientManifest: clientManifest
    })

    console.log('~~~~~~render:' + renderer)

    // renderToString(ctx, renderer).then(res => {
    //     console.log('response:' + res)
    //     ctx.body = res
    // }, err => {
    //     console.log('response:' + err)
    // })
    // renderer.renderToString(ctx, (err, html) => {
    //    if (err) {
    //         console.log('response:' + err)
    //    } else {
    //         console.log('response:' + html)
    //         ctx.body = html
    //    }
    // })

    console.log('start render')
    const html = await renderToString(ctx, renderer)
    console.log('html:' + html)
    ctx.body = html
}

function renderToString (context, renderer) {
    console.log('-----promise')
    return new Promise((resolve, reject) => {
        console.log('-----promise init')
        renderer.renderToString(context, (err, html) => {
            if (err) {
                reject(err)
                console.log('err:' + err.code)
            } else {
                resolve(html)
                console.log(html)
            }
        })
    })
}

const router = new Router()
router.get('*', handleRequest)

module.exports = router
