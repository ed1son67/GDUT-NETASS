const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const baseUrl = 'https://www.ed1son.cn';

const isEmptyObject = function(obj) {
  return Object.keys(obj).length === 0 ? true : false;
}

module.exports = {
  formatTime: formatTime,
  baseUrl: baseUrl,
  isEmptyObject: isEmptyObject
}

