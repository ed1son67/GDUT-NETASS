//logs.js
const app = getApp();
import { baseUrl } from '../../utils/util.js';

Page({
  data: {
    logs: [],  
    article: {},
    articleData: [{
      title: '',
      content: '',
      footer: ''
    }],
    isActive: 0,
    animationData: {},
    
  },
  setActive: function(e) {
    // 获取当前点击的index
    var index = e.target.dataset.index;
    // 初始化动画数据
    var animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'ease-out',
      delay: 0
    })
    // 距离左边位置
    animation.left((index * 50) + '%').step()
    // 设置动画
    this.setData({
      animationData: animation.export()
    })
    // 设置对应class
    this.setData({
      isActive: index
    })
  },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading();
    this.queryAllBlog();
  },
  /**
   * 跳转到文章详细页面
   */
  jumpToArticle: function () {
    wx.navigateTo({
      url: '../article/article?name=QG.md'
    })
  },
  /**
   * 查询所有的文章
   */
  queryAllBlog: function () {
    let _this = this;
    wx.request({
      url: baseUrl + '/queryAllBlog',
      method: 'get',
      success: res => {
        console.log(res.data);
        // 停止刷新
        wx.stopPullDownRefresh();
        wx.hideNavigationBarLoading();
        this.setData({
          articleData: res.data
        })
      }
    })
  },
  
  onLoad: function () {
    this.queryAllBlog();
    

  },
  onReachBottom: function() {
    console.log(123);

  }
})