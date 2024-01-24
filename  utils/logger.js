function logger(param) {
  return {
    info: (text) => {
      console.log(`${param}: ${text}`)
    },
    warn: (text) => {
      console.warn(`${param}: ${text}`)
    },
    error: (text) => {
      console.error(`${param}: ${text}`)
    }
  }
}


module.exports = logger