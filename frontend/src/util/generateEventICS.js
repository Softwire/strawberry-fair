const ics = require('ics')

export const generateEventICS = (title, startDateTime, endDateTime, content) => {
  let file;

  // Generate event information
  const startDate = new Date(startDateTime)
  const endDate = new Date(startDateTime)
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
