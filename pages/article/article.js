// pages/article/article.js
const app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    article: {},
    title: '',
    time: '',
    loading: true
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let blogName = options.name,
        title = options.title,
        time = options.time,
        blogType = options.type

    console.log(options)
    const blogTypes = ['业务流程', '常用教程', '常见故障'];
    wx.setNavigationBarTitle({
      title: blogTypes[blogType]
    })

    wx.cloud.callFunction({
      name: 'getBlogDetail',
      data: {
        blogName: title,
        type: blogType
      },
      success: res => {
        
        if (!res.result) {
          console.log('找不到该文章');
          wx.showModal({
            title: '',
            content: '找不到该文章',
          })
          return;
        };
        let articleData = app.towxml.toJson(res.result, 'markdown');

        articleData = app.towxml.initData(articleData, {
          base: 'http://ed1son.cn:8001',
          app: this
        });
        
        this.setData({
          article: articleData,
          title: title,
          time: time,
          loading: false
        })
      },
      fail: err => {

        console.warn(err);
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