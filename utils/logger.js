function checkData(args) {
  let result = '';
  const arr = [];
  Object.values(args).forEach(el => {
    if (typeof el !== 'object') {
      result += el + ' ';
    } else {
      Object.values(el).forEach(element => {
        arr.push(element);
      })
      result += arr.join(' ') + ' ';
      arr.splice(0);
    }
  })
  return result;
}

function logger(param) {
  return {
    info: (...args) => {
      const result = checkData(args);
      console.log(`${param}: ${result}`);
    },
    warn: (...args) => {
      const result = checkData(args);
      console.warn(`${param}: ${result}`);
    },
    error: (...args) => {
      const result = checkData(args);
      console.error(`${param}: ${result}`);
    },
  }
}

module.exports = logger