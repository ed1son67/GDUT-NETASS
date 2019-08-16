//logs.js
const app = getApp();
import { baseUrl } from '../../utils/util.js';

Page({
  data: {
    logs: [],
    article: {},
    blogList: [
      [], [], []
    ],
    loadingStatus: [true, true, true],
    pages: [1, 1, 1],
    animationData: {},
    loadingText: "查看更多",
    blogType: 0,
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
    animation.left((index * 33.3) + '%').step();
    // 设置动画和tab的类型
    this.setData({
      animationData: animation.export(),
      blogType: index
    })
    console.log(this.data.blogType)

    // 判断是否为首次加载
    if (!this.data.blogList[index].length) {
      this.setData({
        showSkeleton: true,
      })
      this.queryBlogsByPage();
    }
  },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading();
    // 重置所有的状态
    
    this.data.loadingStatus = [true, true, true];

    this.setData({
      blogList: [[], [], []],
      pages: [1, 1, 1],
      loadingText: "查看更多",
      showSkeleton: true
    }, function() {
      this.queryBlogsByPage();
    })
  },
  /**
   * 跳转到文章详细页面
   */
  jumpToArticle: function (e) {
    let data = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: "../article/article?title=" + data.title + "&time=" + data.timeStamp + "&type=" + data.type + "&view=" + data.view
    })
  },
  /**
   * 查询所有的文章
   */
  queryBlogsByPage: function () {
    // 需要维护三个页码, 也可以自定义页码
    let nowPage = this.data.pages[this.data.blogType];
    
    this._getBlog({
      page: nowPage,
      
    }, function (res) {
      wx.stopPullDownRefresh();
      wx.hideNavigationBarLoading();
      switch (this.data.blogType) {
        case 0: {
          this.setData({
            'blogList[0]': res
          })
          break;
        }
        case 1: {
          this.setData({
            'blogList[1]': res
          })
          break;
        }
        case 2: {
          this.setData({
            'blogList[2]': res
          })
          break;
        }
      }
      this.setData({ showSkeleton: false });
    })
  },
  /**
   * 请求云函数
   */
  _getBlog(data, cb, ecb) {
    console.log(data.page)
    wx.cloud.callFunction({
      name: 'getBlogList',
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
    if (!this.data.loadingStatus[this.data.blogType]) return;

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
              'blogList[0]': this.data.blogList[0].concat(res)
            })
            break;
          } case 1: {
            this.setData({
              'blogList[1]': this.data.blogList[1].concat(res)
            })
            break;
          } case 2: {
            this.setData({
              'blogList[2]': this.data.blogList[2].concat(res)
            })
            break;
          } 
        }
        this.setData({
          loadingText: '加载更多'
        })
      } else {
        // 找不到更多
        this.setData({
          loadingText: "找不到更多了",
        })
        this.data.loadingStatus[this.data.blogType] = false;
      }
    });
  },
  onLoad: function () {
    // 请求第一页数据
    this.queryBlogsByPage();
  },
  onReachBottom: function () {
    // 还缺一个函数节流
    this.loadMoreBlogs();
  }
})