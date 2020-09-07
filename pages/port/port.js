// pages/port/port.js
import { isEmptyObject } from '../../utils/util.js'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    articleURL: '../article/article?title=关于端口号的一些事',
    buildingIndex: [0, 0],
    buildingData: [
      ['生活西区', '生活东区'], ['西一', '西二', '西三', '西四', '西五', '西六', '西七', '西八','西九','西十','西十一','西十二','西十三','西十四']
    ],
    building: '请选择楼栋',
    bedIndex: 0,
    bedData: ['一号床', '二号床', '三号床', '四号床'],
    bed: '请选择床号',
    room: ''
  },
  /**
   * 床号改变函数
   */
  bedChange: function (e) {
    this.setData({
      bedIndex: e.detail.value,
      bed: this.data.bedData[e.detail.value]
    })
  },
  /**
   * 楼栋列改变触发函数
   */
  buildingColumnChange: function(e) {
    let column = e.detail.column;
    let colunmData = [['西一', '西二', '西三', '西四', '西五', '西六', '西七', '西八', '西九', '西十', '西十一', '西十二', '西十三', '西十四'], ['东一', '东二', '东三', '东四', '东五', '东六', '东七', '东八', '东九', '东十', '东十二', '东十三', '东十四']];
    let data = [['生活西区', '生活东区']]

    if (column === 0) {
      data[1] = colunmData[e.detail.value];

      this.setData({
        buildingData: data
      })
    }
  },
  /**
   * 楼栋值改变触发函数
   */
  buildingChange: function(e) {
    
    this.setData({
      buildingIndex: e.detail.value,
      building: this.data.buildingData[0][e.detail.value[0]] + '，' + this.data.buildingData[1][e.detail.value[1]]
    })
  },
  /**
   * 房间号改变函数
   */
  roomChange: function(e) {
    this.data.room = e.detail.value;
  },
  /**
   * 验证输入的数据是否正确
   */
  verifyInput() {
    if ((this.data.room === '' || this.data.room.length < 3) || this.data.bed === '请选择床号' || this.data.building === '请选择楼栋') 
      return false;
    else 
      return true;
  },
  /**
   * 转换数据的正确格式
   */
  getInputData() {
    let data = {};

    let queryData = {
      bed: this.data.bed,
      room: this.data.room,
      building: this.data.building
    }
    data['room'] = this.data.room;
    data['building'] = this.data.building.slice(6);
    data['bed'] = ['一号床', '二号床', '三号床', '四号床'].indexOf(this.data.bed);
    
    console.log(data);
    return data;
  },
  /**
   * 搜索端口函数
   */
  searchPort: function() {
    if (!this.verifyInput()) {
      wx.showToast({
        title: '请检查你的输入',
        icon: 'none'
      })
      return;
    };

    let queryData = this.getInputData();

    wx.showLoading({
      title: '查询中',
      mask: true
    })
    
    wx.cloud.callFunction({
      name: 'queryPort',
      data: queryData,
      success(res) {
        wx.hideLoading();
        if (res.result === "") {
          wx.showModal({
            title: '查询失败',
            content: '系统暂时未记录该端口号',
            showCancel: false
          })  
        } else {
          wx.showModal({
            title: '您的端口号是：',
            content: res.result,
            showCancel: false
          })  
        }  
      },
      fail(err) {
        console.log(err);
        wx.hideLoading();
        wx.showModal({
          title: '查询失败',
          content: '请检查网络后重试',
          showCancel: false
        })  
      }
    })
  },
  onShareAppMessage: function (res) {
    return {
      title: '欢迎使用校园网端口查询服务',
      path: 'pages/port/index'
    }
  }
})