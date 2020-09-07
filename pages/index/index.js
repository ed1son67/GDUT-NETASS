//index.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util.js');

Page({
  data: {
  },
  onShareAppMessage: function () {
    return {
      title: "欢迎使用工大网络助手",
      path: 'pages/index/index'
    }
  },
  onLoad: function () {
    util.getNotices(0, this.setNotices);
  }
})
