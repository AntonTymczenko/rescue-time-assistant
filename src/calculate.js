export default function ({ doneHoursNumber, daysOff = [] }) {
  const currentMonth = {
    total: 0,
    daysOff,
    mondayThroughFriday: 0,
    maxPossibleWorkingDays: 0,
    withSat: 0,
    leftDays: {
      mondayThroughFriday: 0,
      withSat: 0,
    },
  }

  let now = new Date()
  if (now.getHours() < 7) now = new Date(now.getTime() - 1000 * 60 * 60 * 24)
  const todayDate = now.getDate()
  currentMonth.total = new Date(now.getYear(), now.getMonth() + 1, 0).getDate()

  for (let date = 1; date <= currentMonth.total; date++) {
    const day = new Date(now)
    day.setDate(date)
    const weekday = day.getDay()
    const notSunday = !!weekday
    if (notSunday) {
      const isMondayThroughFriday = weekday < 6;
      if (isMondayThroughFriday) {
          currentMonth.maxPossibleWorkingDays++
      }
      const isDayOff = currentMonth.daysOff.indexOf(date) !== -1
      if (!isDayOff) {
          currentMonth.withSat++
          if (date > todayDate) currentMonth.leftDays.withSat++
          if (isMondayThroughFriday) {
              currentMonth.mondayThroughFriday++
              if (date > todayDate) currentMonth.leftDays.mondayThroughFriday++
          }
      }
    }
  }

  const maxWorkingHours = Math.max(22, currentMonth.maxPossibleWorkingDays) * 8;

  const hoursLeftPerDay = [currentMonth.leftDays.mondayThroughFriday, currentMonth.leftDays.withSat].map(leftDays => {
    const hours = (maxWorkingHours - doneHoursNumber) / leftDays
    const h = Math.trunc(hours)
    const m = Math.round((hours - h) * 60)
    return {
      raw: hours,
      formatted: `${Math.trunc(hours)}:${m}`,
    }
  })

  // const output = document.querySelector('#dashboard-time-summary-context')
  // const result = `Mon-Fri: ${hoursLeftPerDay[0]}, Mon-Sat: ${hoursLeftPerDay[1]}`
  // output.textContent = result

  return {
    'Mon-Fri': hoursLeftPerDay[0],
    'Mon-Sat': hoursLeftPerDay[1],
  }

}
