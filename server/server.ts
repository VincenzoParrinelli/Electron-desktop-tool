const express = require('express')
const cors = require("cors")
const bodyParser = require("body-parser")
const puppeteer = require("puppeteer")

const app = express()

app.use(cors({ origin: 'http://localhost:3000' }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

let browser
let page

app.get("/open-browser", async (req, res) => {

    browser = await puppeteer.launch({
        product: 'firefox',
        headless: false,
        defaultViewport: false
    })

    page = await browser.newPage()

    await page.goto("https://www.ilportaledellautomobilista.it/web/portale-automobilista/loginspid")

    res.sendStatus(200)
})


app.post("/automation", async (req, res, next) => {

    //const button = (await page.$x('/html/body/div[3]/div/div[2]/button[1]'))[0].click() //WORKS
    //await page.click('.cpBanner-button--accept') //WORKS

    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')

    const candidates = req.body as []

    candidates.forEach(async candidate => {

        const { id, examHour } = candidate

        await page.goto("https://www.ilportaledellautomobilista.it/RichiestaPatenti/richiesta/Read_initAction.action?pageStatus=SEARCH&MENU=Ricerca")
        await page.type("#Read_initAction_richiestaView_richiestaFrom_marcaOperativa", id)
        await page.keyboard.press('Enter')

        if ((await page.$x("/html/body/div[3]/div[2]/div/div/div"))[0] || (await page.$x("/html/body/h1"))[0]) return

        const lastNameFirstLetter = await page.$eval("#Read_paging_richiestaView_cognome", lastNameInput => lastNameInput.getAttribute("value")[0])

        const statinoCode = await page.$eval("#Read_paging_richiestaView_richiestaFrom_numeroFRToView", code => code.getAttribute("value"))

        const page2 = await browser.newPage()

        await page2.click("#DettaglioDisponibilitaSessioneEsameEP_button_value_newCandidato")

        await page2.type("#DisponibilitaSessioneEsameEP_disponibilitaSessioneEsameEPView_prenotazioneCandidatoEP_theRichiestaEmissioneDocumentoAbilitazioneEP_codiceFoglioRosa", statinoCode)
        await page2.type("#DisponibilitaSessioneEsameEP_disponibilitaSessioneEsameEPView_prenotazioneCandidatoEP_theRichiestaEmissioneDocumentoAbilitazioneEP_thePersonaFisica_descrizioneCognomePersonaFisica", lastNameFirstLetter)

        //TODO: Select by value 
        const selectBtn = await page2.$("#DisponibilitaSessioneEsameEP_disponibilitaSessioneEsameEPView_prenotazioneCandidatoEP_turnoEsaminatore")

        if (examHour === 8 || examHour === 14) await selectBtn.select("1")
        else if (examHour === 9 || examHour === 15) await selectBtn.select("2")
        else if (examHour === 10) await selectBtn.select("3")
        else if (examHour === 11) await selectBtn.select("4")
        else if (examHour === 12) await selectBtn.select("5")
        else if (examHour === 13) await selectBtn.select("6")

        ///

        await page2.click("#DisponibilitaSessioneEsameEP_button_value_conferma")

        if (await page2.$(".errori")) return await page2.click("#DisponibilitaSessioneEsameEP_button_value_backFromNew")

        await page2.click("#DisponibilitaSessioneEsameEP_button_value_undoFromDelete")
    })


    res.sendStatus(200)
})

app.listen(5000)

module.exports = app


