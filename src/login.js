import { baseURL } from './helpers.js'

async function login ({ cookies, credentials }) {
  const page = this

  console.log('loginByCookies')
  if (cookies && cookies.length === 2) {
    await page.setCookie(...cookies)

    const loggedIn = await page.goAndVerify(baseURL)

    if (loggedIn) return
  }

  // if failed to log in by cookies

  // remove cookies


  loginByCredentials.call(page, credentials)
}

async function loginByCredentials (credentials) {
  const page = this

  console.log('loginByCredentials')
  console.log(credentials)



  return
}

export default login
