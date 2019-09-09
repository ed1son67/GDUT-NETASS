//index.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util.js');

Page({
  data: {
    showMask: false,
    maskTitle: '最新通知',
    maskContent: '你好',
    notices: []
  },
  
  onLoad: function () {
    
    util.getNotices(0, this.setNotices);
  },
  setNotices: function(res) {
    
      console.log(res);
      this.setData({
        notices: res
      })
    
  },
  // getNotice: function(){
  //   wx.cloud.callFunction({
  //     name: "getLatestNotices",
  //     data: {
  //       tab: 1
  //     },
  //     success: function(res) {
  //       let data = res.result.data;
  //       for (let notice of data) {
  //         console.log(notice);
  //       }
  //     },
  //     fail: function() {

  //     }
  //   })
  // },
  openMask: function() {
    this.setData({
      showMask: true
    })
  },
  closeMask: function() {
    this.setData({
      showMask: false
    })
  },
  onShareAppMessage: function(res) {
    return {
      title: '',
      
    }
  }
})
