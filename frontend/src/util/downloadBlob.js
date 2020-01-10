// Allows downloading of a Blob object as a file
export const downloadBlob = (blob, filename = "file") => {
  if (window.navigator.msSaveOrOpenBlob) {
    // IE10+
    window.navigator.msSaveOrOpenBlob(blob, filename)
  } else {
    // Other browsers
    let a = document.createElement("a")
    let url = URL.createObjectURL(blob)
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    setTimeout(() => {
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    }, 0)
  }
}
