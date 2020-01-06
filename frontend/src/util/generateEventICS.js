const ics = require('ics')
const h2p = require('html2plaintext')

export const generateEventICS = (title, startDateTime, endDateTime, content) => {
  let file;

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
      console.log(error)
    }
    
    file = new Blob([value], {type: 'text/calendar'})
  })

  if (file) {
    return file
  }
}
