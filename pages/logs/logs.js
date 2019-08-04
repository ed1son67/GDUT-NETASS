//logs.js
const app = getApp();
import { baseUrl } from '../../utils/util.js';

Page({
  data: {
    logs: [],  
    article: {},
    tutorialData: [],
    processData: [],
    methodsData: [],
    pages: [1, 0, 0],
    tutorialPage: 1,
    processPage: 1,
    methodsPage: 1,
    isActive: 0,
    animationData: {},
    loadingText: "查看更多",
    blogType: 0,
    showSkeleton: true
  },
  turnPage: function(e) {
    // 设置当前tabbar
    var index = e.target.dataset.index;
    // 防止重复点击同一个类别
    if (index === this.data.blogType) return;
    // 初始化动画数据
    var animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'ease-out',
      delay: 0
    })
    // 距离左边位置
    animation.left((index * 33.3) + '%').step()
    // 设置动画
    this.setData({
      animationData: animation.export()
    })
    // 设置对应class
    this.setData({
      isActive: index,
      blogType: index,
    })
    this.data.showSkeleton = false;
    // 判断是否为首次加载
    if (this.data.pages[index] === 0) {
      this.setData({
        showSkeleton: true,
      })
      this.data.pages[index]++;
    }
  },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading();
    this.queryBlogsByPage(1);
    this.setData({
      loadingText: "查看更多"
    }) 
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
  queryBlogsByPage: function (page) {
    // 需要维护三个页码, 也可以自定义页码
    let nowPage = page || this.data.pages[this.data.blogType];
    this._getBlog({ 
      page: page, 
      
    }, function(res) {
      wx.stopPullDownRefresh();
      wx.hideNavigationBarLoading();
      this.setData({
        tutorialData: res,
        showSkeleton: false
      })
    
    })
  },
  /**
   * 请求云函数
   */
  _getBlog(data, cb, ecb) {
    wx.cloud.callFunction({
      name: 'queryBlog', 
      data: {
        page: data.page,
        blogType: this.data.blogType
      },
      success: res => {
        console.log(res.result.data)
        cb.call(this, res.result.data);
      },
      fail: err => {
        if (ecb) ecb.call(this, err);
        console.err
      }
    })
  },
  /**
   * 翻页请求函数
   */
  loadMoreBlogs() {

    this.setData({
      loadingText: "正在加载中..."
    })
    
    // 获取当前的页码
    let nowPage = ++this.data.pages[this.data.blogType];
    
    this._getBlog({ page: nowPage }, function(res) {
      if (res.length) {
        this.setData({
          tutorialData: this.data.tutorialData.concat(res),
          loadingText: '加载更多'
        })
      } else {
        // 找不到更多
        this.setData({
          loadingText: "找不到更多了"
        })
      }
    });
  },
  onLoad: function () {
    // 请求第一页数据
    this.queryBlogsByPage(1);
  },
  onReachBottom: function() {
    // 还缺一个函数节流
    this.loadMoreBlogs();
  }
})