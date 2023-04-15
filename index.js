import * as puppeteer from "puppeteer"
import * as dotenv from 'dotenv'
import axios from "axios";

export const runner = async () => {
  dotenv.config();
  console.log("building puppet..")

  const [browser, killbrowser] = await newBrowser()
  const page = await buildPage(browser)

  console.log("started")

  try {
    const inputFieldSelector = "[name=q]"
    await page.waitForSelector(inputFieldSelector)

    console.log("typing")

    await page.type(inputFieldSelector, "oiee")

    console.log("typed successfully")
    // await page.click(".gNO89b")

    // console.log("waiting for navigation...")
    // await page.waitForNavigation()

  } catch (err) {
    console.log("ERROR: ", err)
  } finally {
    console.log("finished execution")
    await browser.close()
  }
}

async function buildPage(browser) {
  const url = "https://www.google.com"

  const page = await browser.newPage()
  page.goto(url)
  page.setViewport({
    width: 1280,
    height: 720,
  })

  return page
}

async function newBrowser() {
  const browser = await puppeteer.launch({
    headless: true,
    timeout: 900000,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ]
  })

  const killback = () => browser.close()

  return [browser, killback]
}

runner()