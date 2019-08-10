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
    isActive: 0,
    animationData: {},
    loadingText: "查看更多",
    blogType: 0,
    loadingStatus: [false, false, false],
    showSkeleton: true
  },
  turnPage: function (e) {
    // 设置当前tabBar
    var index = parseInt(e.target.dataset.index);
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

    // 判断是否为首次加载
    if (this.data.pages[index] === 0) {
      this.setData({
        showSkeleton: true,
      })
      this.data.pages[index]++;
      this.queryBlogsByPage();
      // this.data.loadingStatus[0] = true
      // console.log(this.data.loadingStatus[0]);
    }
  },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading();
    // 重置所有的页码

    this.queryBlogsByPage(1);
    this.setData({
      
      tutorialData: [],
      processData: [],
      methodsData: [],
      pages: [0, 0, 0],
      loadingText: "查看更多",
      showSkeleton: true
    })
  },
  /**
   * 跳转到文章详细页面
   */
  jumpToArticle: function (e) {
    let data = e.currentTarget.dataset.item;

    wx.navigateTo({
      url: "../article/article?name=" + data.name + "&title=" + data.title + "&time=" + data.timeStamp + "&type=" + data.type
     
    })
  },
  /**
   * 查询所有的文章
   */
  queryBlogsByPage: function (page) {
    // 需要维护三个页码, 也可以自定义页码
    let nowPage = page || this.data.pages[this.data.blogType];


    this._getBlog({
      page: nowPage,
      
    }, function (res) {
      wx.stopPullDownRefresh();
      wx.hideNavigationBarLoading();
    
      if (this.data.blogType == 0) {
        this.setData({
          processData: res,
          showSkeleton: false
        })
      } else if (this.data.blogType == 1) {
        this.setData({
          tutorialData: res,
          showSkeleton: false
        })
      } else if (this.data.blogType == 2) {
        this.setData({
          methodsData: res,
          showSkeleton: false
        })
      }
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
        console.log(res.result)
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

    this._getBlog({ page: nowPage }, function (res) {
      if (res.length) {
        switch(this.data.blogType) {
          case 0: {
            this.setData({
              processData: this.data.processData.concat(res),
              loadingText: '加载更多'
            })
            break;
          } case 1: {
            this.setData({
              tutorialData: this.data.tutorialData.concat(res),
              loadingText: '加载更多'
            })
            break;
          } case 2: {
            this.setData({
              methodsData: this.data.methodsData.concat(res),
              loadingText: '加载更多'
            })
            break;
          }
        }
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
  onReachBottom: function () {
    // 还缺一个函数节流
    this.loadMoreBlogs();
  }
})