//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
  },
  onShareAppMessage: function () {
    return {
      title: "欢迎使用工大网络助手",
      path: 'pages/index/index'
    }
  }
})