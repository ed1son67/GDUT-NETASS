//logs.js
const app = getApp();

Page({
  data: {
    logs: [],
    article: {}
  },
  onPullDownRefres: function() {
    console.log(123);
  },
  onLoad: function () {
    let _this = this;
    // wx.request({
    //   url: 'https://www.ed1son.cn/doc/QG.md',
    //   success: (res) => {
    //     let articleData = app.towxml.toJson(res.data, 'markdown');
    //     console.log(articleData);
    //     articleData = app.towxml.initData(articleData, {
    //       base: 'http://ed1son.cn:8001',
    //       app: _this
    //     });

    //     _this.setData({
    //       article: articleData
    //     })
    //   }
    // })
  }
})
