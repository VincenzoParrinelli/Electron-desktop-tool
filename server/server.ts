const express = require('express')
const puppeteer = require("puppeteer")

const app = express()

app.get("/test", async (req, res, next) => {

    const browser = await puppeteer.launch({
        product: 'firefox',
        headless: false
    })

    
})

app.listen(5000)

module.exports = app


