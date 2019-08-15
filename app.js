//app.js
/**
 * 广东工业大学 网络技术与信息服务中心 2019年数字校园项目
 * 作者：陈子锋 ed1sion.czf@qq.com
 * ©️版权所有
 */
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

