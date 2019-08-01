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
    }]
  },
  onPullDownRefresh: function () {
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
        
        this.setData({
          articleData: res.data
        })
      }
    })
  },
  onLoad: function () {
    this.queryAllBlog();
  }
})