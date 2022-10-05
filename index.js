const puppeteer = require("puppeteer")

async function start() {

    const browser = await puppeteer.launch()
    const page  = await browser.newPage()
    await page.goto('site link')
    await page.screenshot( {path: 'example.png'} )

    await browser.close()
};

start()
