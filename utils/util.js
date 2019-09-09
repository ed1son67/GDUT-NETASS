
const baseUrl = 'https://www.ed1son.cn';

const isEmptyObject = function(obj) {
  return Object.keys(obj).length === 0 ? true : false;
}
const getNotices = function(tab, cb) {
  
    wx.cloud.callFunction({
      name: "getLatestNotices",
      data: {
        tab: tab
      },
      success: function(res) {
        cb.call(this, res.result.data);
        
      },
      fail: function() {

      }
    })
  
}
module.exports = {
  baseUrl: baseUrl,
  isEmptyObject: isEmptyObject,
  getNotices: getNotices
}

