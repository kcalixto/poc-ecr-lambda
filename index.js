import * as puppeteer from "puppeteer"

export const runner = async () => {
  const [browser, killbrowser] = await newBrowser()
  const page = await buildPage(browser)

  try {
    await page.waitForSelector("input[name=q]")
    await page.type("input[name=q]", "oiee")

    await page.click(".gNO89b")

    await page.waitForNavigation()

  } catch (err) {
    console.log("ERROR: ", err)
  } finally {
    console.log("finished execution")

    fetch("https://6jwumvrjo1.execute-api.sa-east-1.amazonaws.com/produce", {
      method: 'POST',
      body: JSON.stringify({ "message": "ran puppeteer successfully!" })
    })
    .then((resp) => resp.json())
    .then((data) => console.log(data))

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