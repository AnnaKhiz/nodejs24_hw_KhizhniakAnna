function logger(param) {
  return {
    info: (text) => {
      console.log(`${param}: ${text}`)
    },
    warn: (...args) => {
      console.warn(`You have a warn: ${args}`)
    },
    error: (...args) => {
      throw new Error(`You have an error: ${args}`)
    }
  }
}

module.exports = logger