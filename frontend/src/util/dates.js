// Do two dateTimes occur on the same day?
export function areSameDay(date1, date2) {
    const daysMatch = date1.getDate() === date2.getDate()           // Do the days (of the month) match?
    const monthsMatch = date1.getMonth() === date2.getMonth()       // Do the months match?
    const yearsMatch = date1.getFullYear() === date2.getFullYear()  // Do the years match?
    return daysMatch && monthsMatch && yearsMatch                   // Then they render to the same day
}

// Does this date occur on or after the given day?
// Even if an event took place "earlier today", it will still show up
export function isOnOrAfterDay(baseDate, testDate) {
    const basePureDate = toPureDate(baseDate)
    const testPureDate = toPureDate(testDate)

    return testPureDate.getTime() >= basePureDate.getTime()
}

// Removes the time part of a Date
function toPureDate(dateTime) {
    return new Date(dateTime.getFullYear(), dateTime.getMonth(), dateTime.getDate())
}
