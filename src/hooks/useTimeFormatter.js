const useTimeFormatter = () => {
  function formatDate(inputDate) {
    // Parse the input date string into a Date object
    const date = new Date(inputDate)

    // Extract date components
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0') // Month is zero-indexed
    const year = date.getFullYear()

    // Extract time components
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')

    // Format the date and time
    const formattedDate = `${day}/${month}/${year}`
    const formattedTime = `${hours}:${minutes} WIB`

    // Combine date and time in the desired format
    const formattedDateTime = `${formattedDate} ${formattedTime}`

    return formattedDateTime
  }

  function formatDuration(minutes) {
    // Calculate hours and remaining minutes
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60

    // Construct the formatted duration string
    let formattedDuration = ''

    if (hours > 0) {
      formattedDuration += `${hours} hour`
      if (hours > 1) {
        formattedDuration += 's' // Pluralize "hour" if more than 1 hour
      }
    }

    if (remainingMinutes > 0) {
      if (hours > 0) {
        formattedDuration += ' ' // Add space between hours and minutes
      }
      formattedDuration += `${remainingMinutes} minute`
      if (remainingMinutes > 1) {
        formattedDuration += 's' // Pluralize "minute" if more than 1 minute
      }
    }

    if (formattedDuration === '') {
      formattedDuration = '0 minutes'
    }

    return formattedDuration
  }

  function formatDateToUTC(dateString) {
    const dateOnly = new Date(dateString)

    // Get current client's local time
    const now = new Date()

    // Set the time portion of the dateOnly object to match the current client's local time
    dateOnly.setHours(now.getHours() + 7)
    dateOnly.setMinutes(now.getMinutes())
    dateOnly.setSeconds(now.getSeconds())

    // Get the timezone offset of the client's location
    const timezoneOffsetMinutes = now.getTimezoneOffset()
    const timezoneOffsetHours = Math.abs(Math.floor(timezoneOffsetMinutes / 60))
    const timezoneOffsetSign = timezoneOffsetMinutes < 0 ? '+' : '-'

    // Construct the timezone offset string in the format ±HH:MM
    const timezoneOffset = `${timezoneOffsetSign}${String(timezoneOffsetHours).padStart(2, '0')}:00`

    // Format the date with time and timezone offset
    const formattedDate = dateOnly.toISOString().slice(0, 19) + timezoneOffset

    return formattedDate
  }

  return { formatDate, formatDuration, formatDateToUTC }
}

export default useTimeFormatter
