// pages/article/article.js
const util = require('../../utils/util.js');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    blog: {},
    title: '',
    time: '',
    view: 0,
    loading: true
  },
  getEntireBlog: function(title) {
    wx.cloud.callFunction({
      name: 'getBlog',
      data: {
        title: title,
      },
      success: res => {
        if (util.isEmptyObject(res.result)) {
          console.log('找不到该文章');
          wx.showModal({
            title: '',
            content: '找不到该文章',
            showCancel:false,
            success: () => {
              wx.navigateBack({
                delta: 1
              })
            }
          })
          return;
        };
        this.setBlogData(res.result);
      },
      fail: err => {
        console.warn(err);
      }
    })
  },
  getBlogFile: function(options) {
    wx.cloud.callFunction({
      name: 'getBlogDetail',
      data: {
        title: options.title,
        type: options.type
      },
      success: res => {
        if (res.result === false) {
          console.log('找不到该文章');
          wx.showModal({
            title: '',
            content: '找不到该文章',
            showCancel: false,
            success: () => {
              wx.navigateBack({
                delta: 1
              })
            }
          })
          return;
        };
        this.setBlogData({
          title: options.title,
          time: options.time,
          type: options.type,
          content: res.result,
          view: options.view
        });
      },
      fail: err => {
        console.warn(err);
        this.getBlogFailCallBack();
      }
    })
  },
  getBlogFailCallBack: function() {
    wx.showModal({
      title: '请求超时',
      content: '请检查网络后重试',
      showCancel: false,
      success: () => {
        wx.navigateBack({
          delta: 1
        })
      }
    })
  },
  setBlogData: function(data) {
    let blogData = app.towxml.toJson(data.content, 'markdown');

    const blogTypes = ['业务流程', '常用教程', '常见故障'];

    wx.setNavigationBarTitle({
      title: blogTypes[data.type]
    })

    blogData = app.towxml.initData(blogData, {
      base: 'http://ed1son.cn:8001',
      app: this
    });
    // 绑定点击事件
    this['event_bind_tap'] = this.tapEventLisenter;

    this.setData({
      blog: blogData,
      title: data.title,
      time: data.time,
      loading: false
    })
    
    wx.cloud.callFunction({
      name: 'updateBlog',
      data: {
        title: data.title,
      }
    })
  },
  /** 
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.title && options.time && options.type) {
      this.getBlogFile(options);
    } else if (options.title) {
      this.getEntireBlog(options.title)
    } else {
      // 请求参数有误
    }
  },

  tapEventLisenter: function(event) {
    let el = event.target.dataset._el;
    if (el.tag !== 'navigator') return;
    let url = el._e.attr.href;
    
    if (url.slice(0, 4) == 'http') {
      wx.showModal({
        title: '请复制到浏览器打开',
        content: url,
        confirmText: '复制',
        showCancel: false,
        success: function () {
          wx.setClipboardData({
            data: url,
            success(res) {
              wx.getClipboardData({
                success(res) {
                  console.log(res.data) // data
                }
              })
            }
          })
        }
      })
    } else {
      wx.navigateTo({
        url: decodeURI(url)
      })
    }
  }
})