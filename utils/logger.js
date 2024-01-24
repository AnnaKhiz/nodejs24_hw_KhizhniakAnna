function logger(param) {
  return {
    info: (...args) => console.log(`${param}:`, ...args),
    warn: (...args) => console.warn(`${param}:`, ...args),
    error: (...args) => console.error(`${param}:`, ...args),
  }
}

module.exports = logger