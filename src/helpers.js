async function goAndVerify (url) {
  const page = this

  await page.goto(url)

  const title = await page.title()
  const actualUrl = await page.url()

  const ok = url === actualUrl
  if (!ok) {
    console.log(`Got "${title}", ${actualUrl}\ninstead of ${url}`)
  }
  return ok
}

const baseURL = 'https://www.rescuetime.com/dashboard'

export {
  baseURL,
  goAndVerify,
}
