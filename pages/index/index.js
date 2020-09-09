//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
  },
  copyWebSite: function (e) {
    const text = e.currentTarget.dataset.copy;
    wx.showModal({
      title: '点击确认复制文字',
      content: text,
      confirmText: '确认',
      showCancel: false,
      success: function () {
        wx.setClipboardData({
          data: text,
          success(res) {
            wx.getClipboardData({
              success(res) {
                console.log(res.data) // data
              }
            })
          }
        })
      }
    });
  },
  onShareAppMessage: function () {
    return {
      title: "欢迎使用工大网络助手",
      path: 'pages/index/index'
    }
  }
})