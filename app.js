const koa = require("koa")
const Router = require("koa-router")
const mongoose = require("mongoose")
const bodyParser = require('koa-bodyparser')
const passport = require('koa-passport')
const db = require("./config/keys").mongoURI


// 实例化kao
const app = new koa()
app.use(bodyParser())
const router = new Router()

// 引入users.js
const users = require("./routes/api/users")
// 路由
router.get('/', async ctx => {
  ctx.body = {msg: "Hello Koa"}
})

mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log('数据库链接成功')
})
.catch(err => {
  console.log('数据库链接失败')
})

app.use(passport.initialize())
app.use(passport.session())

// 回调到config文件中 passport.js
console.log('==================', passport)
require("./config/passport")(passport)

// 配置路由地址
router.use('/api/users', users)

// 配置路由
app.use(router.routes())
.use(router.allowedMethods())

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`[demo] server is starting at port ${port}!`)
})
