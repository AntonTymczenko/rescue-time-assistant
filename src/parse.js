async function parseMonth () {
  const page = this

  const selectors = {
    mode: '.spotlight-name',
    total:'#dashboard-time-summary-total',
  }

  try {
    const done = await page.evaluate(() => {
      const mode = document.querySelector(selectors.mode).textContent
      if (mode !== 'Monthly') return null

      const done = document
        .querySelector(selectors.total)
        .textContent
        .match(/(\d+h\s\d+m|\d+h[\s\d+m]?)/i)

      return done
    })


    if (!Array.isArray(done) || !done[0]) return null

    const hours = parseInt(done[0].split(' ')[0])
    const minutes = parseInt(done[0].split(' ')[1]) || 0
    const doneHoursNumber = hours + minutes / 60
    return doneHoursNumber
  } catch (error) {
    console.log(error)
    return null
  }
}


async function parseToday () {
  const page = this

  return 'today'
}

export {
  parseMonth,
  parseToday,
}
