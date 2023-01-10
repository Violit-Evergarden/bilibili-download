const koaBody = require('koa-body')
const KoaStatic = require('koa-static')
const cors = require('koa2-cors')
const Koa = require('koa')
const app = new Koa()
const router = require('./router')

const serverPort = 3002
const serverUrl = `http://localhost:${3002}`
const path = require("path")


app
    .use(koaBody())
    .use(cors())
    // .use(KoaStatic(path.join(__dirname,'../assets')))
    // .use(KoaStatic(path.join(__dirname,'../../../src/assets')))
    .use(router.routes())
    .use(router.allowedMethods())
    try {
        app.listen(serverPort, () => {
            console.log(`server running at ${serverUrl}`)
            return
        })
    } catch (error) {
        console.log(error);
    }