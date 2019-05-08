//logs.js
const app = getApp();

Page({
  data: {
    logs: [],
    article: {}
  },
  onLoad: function () {
    let _this = this;
    wx.request({
      url: 'http://ed1son.cn:8001/doc/QG.md',
      success: (res) => {
        let articleData = app.towxml.toJson(res.data, 'markdown');
        console.log(articleData);
        articleData = app.towxml.initData(articleData, {
          base: 'http://ed1son.cn:8001',
          app: _this
        });

        // articleData.theme = 'light';


        _this.setData({
          article: articleData
        })
      }
    })
  }
})
