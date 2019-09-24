/**
 * Create by on 2019-09-24 15:18
 * author: lxl
 */
/**
 * Create by on 2019-09-24 15:12
 * author: lxl
 */
const http = require('http')
const createHandler = require('github-webhook-handler')
const spawn = require('child_process').spawn
const config = require('./config')

const handler = createHandler({path: '/autodeploy', secret: config.secret})

// 上面的 secret 保持和 GitHub 后台设置的一致

function run_cmd(cmd, args, callback) {

  const child = spawn(cmd, args)
  let resp = ""

  child.stdout.on('data', function (buffer) {
    resp += buffer.toString()
  })
  child.stdout.on('end', function () {
    callback(resp)
  })
}

http.createServer(function (req, res) {
  handler(req, res, function (err) {
    res.statusCode = 404
    res.end('no such location')
  })
}).listen(config.port)
// 这里是监听的端口号

handler.on('error', function (err) {
  console.error('Error:', err.message)
})

handler.on('push', function (event) {
  console.log('Received a push event for %s to %s',
    event.payload.repository.name,
    event.payload.ref)
  run_cmd('sh', ['./deploy.sh'], function (text) {
    console.log(text)
  })
})

/*
handler.on('issues', function (event) {
console.log('Received an issue event for % action=%s: #%d %s',
    event.payload.repository.name,
    event.payload.action,
    event.payload.issue.number,
    event.payload.issue.title)
})
*/
