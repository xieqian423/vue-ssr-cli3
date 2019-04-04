const Vue = require('vue');
const renderer = require('vue-server-renderer').createRenderer({
    template: require('fs').readFileSync('./index.template.html', 'utf-8')
});
const server = require('express')();
const createApp = require('./app');

const context = {
    title: '服务端渲染测试',
    meta: `
        <meta name="viewport" content="width=device-width,initial-scale=1.0">
    `
}

server.get('*', (req, res) => {
    // const app = new Vue({
    //     template: '<div>hello vue ssr, 您访问的URL是{{ url }}</div>',
    //     data: {
    //         url: req.url
    //     }
    // })
    const params = { url: req.url }
    const app = createApp(params)
    renderer.renderToString(app, context, (err, html) => {
        if (err) {
            res.status(500).end('server error');
            return;
        }

        res.end(html)
    })
});

server.listen(8999);
