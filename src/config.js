import dotenv from 'dotenv'
import login from './login.js'
import { parseMonth, parseToday } from './parse.js'
import { goAndVerify } from './helpers.js'


dotenv.config()

const credentials = {
  email: process.env.RT_LOGIN,
  password: process.env.RT_PWD,
}

const domain = 'www.rescuetime.com'

// [ 'remember_user_token', 'RT_TOKEN' ],
// [ '_rescuetime_session4', 'RT_COOKIE' ],
const cookiesMap = {
  'remember_user_token': 'RT_TOKEN',
  '_rescuetime_session4': 'RT_COOKIE',
}

const cookies = Object.keys(cookiesMap)
  .map(name => {
    const value = process.env[cookiesMap[name]]

    return value
      ? {
        name,
        value,
        domain,
      }
      : null
  })
  .filter(cookie => cookie !== null)

const expandPage = (page) => {
  page.login = login

  page.parse = {
    month: parseMonth.bind(page),
    today: parseToday.bind(page),
  }

  page.goAndVerify = goAndVerify.bind(page)
}

const expandBrowser = (browser) => {
  browser.fail = msg => {
    console.log(msg)
    browser.close()
  }
}

export default {
  credentials,
  cookiesMap,
  cookies,
  expandPage,
  expandBrowser,
}
