const ics = require('ics')
const h2p = require('html2plaintext')
const { writeFileSync } = require('fs')

exports.generateEventICS = (filePath, title, startDateTime, endDateTime, content) => {
  // Generate event information
  const startDate = new Date(startDateTime)
  const endDate = new Date(endDateTime)
  const event = {
    start: [
      startDate.getFullYear(),
      startDate.getMonth() + 1,
      startDate.getDate(),
      startDate.getHours(),
      startDate.getMinutes()
    ],
    end: [
      endDate.getFullYear(),
      endDate.getMonth() + 1,
      endDate.getDate(),
      endDate.getHours(),
      endDate.getMinutes()
    ],
    title: title,
    description: h2p(content)
  }

  // Create event, place in Blob
  ics.createEvent(event, (error, value) => {
    if (error) {
      console.error(error)
    } else {
      writeFileSync(filePath, value)
    }
  })
}
