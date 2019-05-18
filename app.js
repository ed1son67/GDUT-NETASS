//app.js
const Towxml = require('/towxml/main');     //引入towxml库

App({
  onLaunch: function () {

  },
  towxml: new Towxml(),
  globalData: {
    userInfo: null
  }
})