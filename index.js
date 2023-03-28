import * as puppeteer from "puppeteer"

export const runner = async () => {
  const [browser, killbrowser] = await newBrowser()
  const page = await buildPage(browser)

  try {
    const selector = "input[name=q]"
    await page.waitForSelector(selector)
    await page.type(selector, "oiee")
    await page.waitForNavigation()

  } catch (err) {
    console.log("ERROR: ", err)
  } finally {
    console.log("finished execution")
    await page.close()
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
    headless: false,
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