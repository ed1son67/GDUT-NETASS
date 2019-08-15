
const baseUrl = 'https://www.ed1son.cn';

const isEmptyObject = function(obj) {
  return Object.keys(obj).length === 0 ? true : false;
}

module.exports = {
  baseUrl: baseUrl,
  isEmptyObject: isEmptyObject
}

