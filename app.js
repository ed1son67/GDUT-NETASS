//app.js
const Towxml = require('/towxml/main');     //引入towxml库

App({
  onLaunch: function () {
    wx.cloud.init();
  },
  towxml: new Towxml(),
  globalData: {
    userInfo: null
  }
})

