// Do two dateTimes occur on the same day?
export function areSameDay(date1, date2) {
    const daysMatch = date1.getDate() === date2.getDate()           // Do the days (of the month) match?
    const monthsMatch = date1.getMonth() === date2.getMonth()       // Do the months match?
    const yearsMatch = date1.getFullYear() === date2.getFullYear()  // Do the years match?
    return daysMatch && monthsMatch && yearsMatch                   // Then they render to the same day
}

// Do two dateTimes occur on the same minute? (Smallest meaningful resolution for events, we've decided)
export function areSameMinute(date1, date2) {
    const minutesMatch = date1.getMinutes() === date2.getMinutes()
    const hoursMatch = date1.getHours() === date2.getHours()
    const daysMatch = date1.getDate() === date2.getDate()
    const monthsMatch = date1.getMonth() === date2.getMonth()
    const yearsMatch = date1.getFullYear() === date2.getFullYear()
    return minutesMatch && hoursMatch && daysMatch && monthsMatch && yearsMatch
}

export function areCurrentYear(date1, date2) {
    const today = new Date()
    const currentYear = today.getFullYear()
    return (date1.getFullYear() === currentYear && date2.getFullYear() === currentYear)
}

// Does this date occur on or after the given day?
// Even if an event took place "earlier today", it will still show up
export function isOnOrAfterDay(baseDate, testDate) {
    const basePureDate = toPureDate(baseDate)
    const testPureDate = toPureDate(testDate)

    return testPureDate.getTime() >= basePureDate.getTime()
}

export function toDateTimeString(dateTime, {isShort, withYear}) {
    const displayStyle = {
        weekday: (isShort ? "short" : "long"),
        day: "numeric",
        month: (isShort ? "short" : "long"),
        hour: "2-digit",
        minute: "2-digit"
    }
    if (withYear) {
        displayStyle.year = "numeric"
    }

    const dtString = dateTime.toLocaleDateString("en-GB", displayStyle)

    return dtString.replace(",", "") // Removes comma after weekday
}

export function toDateString(date) {
    const displayStyle = {
        day: "numeric",
        month: "long",
        year: "numeric"
    }
    return date.toLocaleDateString("en-GB", displayStyle)
}

// Removes the time part of a Date
function toPureDate(dateTime) {
    return new Date(dateTime.getFullYear(), dateTime.getMonth(), dateTime.getDate())
}
