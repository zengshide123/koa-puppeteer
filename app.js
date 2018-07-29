// 引入模块
const Koa = require('koa') ;
const indexRouter = require('./routers') ;
const radioRouter  = require('./routers/radio') ;


// 实例一个服务器对象
const app = new Koa() ;

app.use(indexRouter.routes())
app.use(radioRouter.routes())
// 建立监听

app.listen(8080,()=>{
    console.log(`success at port 8080`)
})
