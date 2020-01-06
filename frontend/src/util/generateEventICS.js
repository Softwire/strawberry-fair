const ics = require('ics')

export const generateEventICS = (title, dateTime, content) => {
  let file;

  // Generate event information
  const date = new Date(dateTime)
  const event = {
    start: [
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate(),
      date.getHours(),
      date.getMinutes()
    ],
    duration: { hours: 1 },
    title: title,
    description: content
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
