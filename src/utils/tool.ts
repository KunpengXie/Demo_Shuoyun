export const readFile = (file: File) => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.readAsBinaryString(file)
    reader.onload = (ev) => {
      resolve(ev.target?.result)
    }
  })
}
