// 引入模块
const KoaRouter = require('koa-router');
const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer');
const Router = new KoaRouter();

Router.get('/', async (ctx, next) => {
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    await page.goto('http://m.qingting.fm/categories/0');
    //  获得消息滚动条的数据
    const infoData = await page.$$eval('.rolling .swiper-slide', nodes => {
        let data = nodes.map(node => {
            let aNode = node.firstElementChild;
            return {
                text: aNode.innerHTML,
                href: aNode.href
            }
        })
        return data;
    });
    let writerStream = fs.createWriteStream(path.resolve(__dirname, 'index_roll_data.json'));
    writerStream.write(JSON.stringify(infoData, undefined, 2), 'UTF8');
    writerStream.end();
    //  获得banner的数据
    // 问题，背景图片没有获得
    const bannerData = await page.$$eval('.banner .swiper-slide', nodes => {
        let data = nodes.map(node => {
            let aNode = node.firstElementChild;
            return {
                imgUrl: getComputedStyle(aNode)['background-image'].replace(/^url[\(]/, '').slice(0, -1),
                href: node.href
            }
        })
        return data;
    });
    writerStream = fs.createWriteStream(path.resolve(__dirname, 'index_banner_data.json'));
    writerStream.write(JSON.stringify(bannerData, undefined, 2), 'UTF8');
    writerStream.end();
    //  获取各主题数据
    // const divsCounts = await page.$$eval('.recommend-group.icon', nodes => {
    //     let data = nodes.map(node => {
    //         let aNode = node.firstElementChild;
    //         let aArr = node.getElementsByTagName('a');
    //         return {
    //             title: aNode.textContent,
    //             href: node.href
    //         }
    //     })
    //     return data;
    // });
    // writerStream = fs.createWriteStream(path.resolve(__dirname, 'index_banner_data.json'));
    // writerStream.write(JSON.stringify(divsCounts, undefined, 2), 'UTF8');
    // writerStream.end();
    // await browser.close();
    ctx.response.body = 'success'
})

module.exports = Router
