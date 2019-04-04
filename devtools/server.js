
const server = require('express')();

server.get('*', (req, res) => {
    // const params = { url: req.url }
    var template = '<div>hello vue ssr, 您访问的URL是{{ ureq.url }}</div>'
    res.end(template)
})

server.listen(8999)
