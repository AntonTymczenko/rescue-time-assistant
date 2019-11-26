import puppeteer from 'puppeteer'
import moment from 'moment'
import config from './config.js'
import calculate from './calculate'
import { baseURL } from './helpers.js'


async function launch () {
  // setup
  const browser = await puppeteer.launch()
  config.expandBrowser(browser)
  const page = await browser.newPage()
  config.expandPage(page)

  // login
  await page.login(config)

  // go to Month page
  const today = moment().format('YYYY-MM-DD')
  const url = `${baseURL}/for/the/month/of/${today}`
  const onMonthPage = await page.goAndVerify(url)
  if (!onMonthPage) return browser.fail('FAILED to get to month page')

  const doneHoursNumber = await page.parse.month()
  console.log(doneHoursNumber)

  const daysOff = [1, 9]

  const result = await calculate({ doneHoursNumber, daysOff })
  console.log(result)


  await browser.close()
}

try {
  launch()
} catch (error) {
  console.error(error)
}
