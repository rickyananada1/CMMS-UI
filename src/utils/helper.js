export const getValueKey = (path, obj) => {
  const pathList = path.split('.')
  return pathList.reduce((prev, curr) => prev?.[curr], obj)
}

export const currencyFormat = (number, format = 'id-ID', currency = 'IDR') => {
  if (typeof number === 'number') {
    return new Intl.NumberFormat(format, {
      style: 'currency',
      currency: currency,
    }).format(number)
  } else {
    return 0
  }
}

export const reformatTimeStamp = (time) => {
  if (typeof time === 'string') {
    const originalTimestamp = time
    const date = new Date(originalTimestamp)
    const day = date.getDate().toString()
    const month = (date.getMonth() + 1).toString().padStart(2, '0') // Adding 1 because getMonth() returns zero-based month index
    const year = date.getFullYear().toString()
    return `${day}-${month}-${year}`
  } else {
    return 'Invalid Time'
  }
}

export const getFilenameFromContentDisposition = (contentDisposition) => {
  const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
  const matches = filenameRegex.exec(contentDisposition)
  if (matches != null && matches[1]) {
    return matches[1].replace(/['"]/g, '')
  }
  return null
}

export const downloadFileContentDisposition = ({ data = null, fileName }) => {
  if (data) {
    const blob = new Blob([data])

    let link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = fileName
    link.click()
  } else {
    return 'Invalid'
  }
}

export const formatThousands = (num) => {
  if (num === null || num === undefined) return ''
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

export const toTitleCase = (text = '') => {
  // Convert snake_case to Title Case
  return text.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}
