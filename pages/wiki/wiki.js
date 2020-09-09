//logs.js
const app = getApp();
const api = require('../../api/index');

Page({
  data: {
    logs: [],
    article: {},
    blogList: [
      [],
      [],
      []
    ],
    loadingStatus: [true, true, true],
    pages: [1, 1, 1],
    animationData: {},
    loadingText: "查看更多",
    blogType: 0,
    showSkeleton: true
  },
  showRead: function() {
    return false;
  },
  turnPage: function(e) {
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

    // 判断是否为首次加载
    if (!this.data.blogList[index].length) {
      this.setData({
        showSkeleton: true,
      })
      this.queryBlogsByPage();

    }
  },
  refleshBlogReadType: function() {
    let _this = this;
    console.log(_this)
    wx.getStorage({
      key: 'read',
      success: function(res) {
        let readData = res.data;
        for (let title of readData) {
          _this.data.blogList[_this.data.blogType].forEach(function(item, index) {
            if (title === item.title) {
              let key = 'blogList[' + _this.data.blogType + ']' + '[' + index + ']' + '.hadRead';

              _this.setData({
                [key]: true
              })
            }
          })
        }
      },
      fail: function(err) {
        console.log(err)
      }
    })
  },
  onPullDownRefresh: function() {
    wx.showNavigationBarLoading();
    // 重置所有的状态

    this.data.loadingStatus = [true, true, true];

    this.setData({
      blogList: [
        [],
        [],
        []
      ],
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
  jumpToArticle: function(e) {
    let data = e.currentTarget.dataset.item;
    let _this = this;

    wx.navigateTo({
      url: "../article/article?title=" + data.title + "&time=" + data.timeStamp + "&type=" + data.type + "&view=" + data.view,
      success: function() {
        _this.setBlogReadType(data.title);
      }
    });
    
  },
  setBlogReadType: function(title) {
    let _this = this;
    wx.getStorage({
      key: 'read',
      success: function (res) {
        let readData = res.data;
        
        if (readData.indexOf(title) !== -1) {
          return;
        }
        readData.push(title);

        _this.data.blogList[_this.data.blogType].forEach(function (item, index) {
          if (title === item.title) {
            let key = 'blogList[' + _this.data.blogType + ']' + '[' + index + ']' + '.hadRead';
            setTimeout(function() {
              _this.setData({
                [key]: true
              })
            }, 1000)
            
          }
        })
        wx.setStorage({
          key: 'read',
          data: readData,
        })
      }
    })
  },
  /**
   * 查询所有的文章
   */
  async queryBlogsByPage() {
    // 需要维护三个页码, 也可以自定义页码
    const blogType = this.data.blogType;
    const nowPage = this.data.pages[blogType];
    const data = await this.getBlogList({ page: nowPage });
    console.log(data);
    wx.stopPullDownRefresh();
    wx.hideNavigationBarLoading();
    let key = 'blogList[' + blogType + ']';
    this.setData({
      [key]: data,
      showSkeleton: false
    });
    // 设置文章的阅读状态
    this.refleshBlogReadType();
  },
  getBlogList({ page, blogType }) {
    return api.getBlogList({
      blogType,
      page
    }).then((res) =>{
      return res.result.data
    })
  },
  /**
   * 翻页请求函数
   */
  async loadMoreBlogs() {
    if (!this.data.loadingStatus[this.data.blogType]) {
      return;
    };

    this.setData({
      loadingText: "正在加载中..."
    })

    // 获取当前的页码
    const blogType = this.data.blogType;
    const nowPage = ++this.data.pages[blogType];
    const data = await this.getBlogList({ page: nowPage, blogType });
    if (data.length) {
      const key = 'blogList[' + blogType + ']';
      this.setData({
        [key]: this.data.blogList[0].concat(data),
        loadingText: '加载更多'
      })
    } else {
      // 找不到更多
      this.setData({
          loadingText: "已到达底部～",
      })
      this.data.loadingStatus[blogType] = false;
    }
  },
  onLoad: function() {
    // 请求第一页数据
    this.queryBlogsByPage();
    // 设置本地已读列表缓存
    wx.getStorage({
      key: 'read',
      success: function(res) {

      },
      fail: function() {
        wx.setStorage({
          key: 'read',
          data: [],
        })
      }
    })
  },
  onReachBottom: function() {
    // 还缺一个函数节流
    this.loadMoreBlogs();
  },
  onShareAppMessage: function(res) {
    return {
      title: '欢迎使用校园网wiki',
      path: 'pages/wiki/index'
    }
  }
})