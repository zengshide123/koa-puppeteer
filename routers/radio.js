// 引入模块
const KoaRouter = require('koa-router');
const path = require('path');
const fs = require('fs');
const Router = new KoaRouter();
Router.get('/radio', async (ctx, next) => {
    ctx.response.body = 'hello world11111'
})

module.exports = Router
