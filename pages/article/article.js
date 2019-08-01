// pages/article/article.js
const app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    article: {},

  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let blogName = options.name;
    wx.request({
      // url: 'http://localhost:8001/blog/' + blogName,
      url: 'https://www.ed1son.cn/doc/' + blogName,

      success: (res) => {
        
        let articleData = app.towxml.toJson(res.data, 'markdown');

        articleData = app.towxml.initData(articleData, {
          base: 'http://ed1son.cn:8001',
          app: this
        });

        this.setData({
          article: articleData
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})