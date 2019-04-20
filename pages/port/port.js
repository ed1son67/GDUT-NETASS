// pages/port/port.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    buildingIndex: [0, 0],
    buildingData: [
      ['生活西区', '生活东区'], ['西一', '西二', '西三', '西四', '西五', '西六', '西七', '西八','西九','西十','西十一','西十二','西十三','西十四']
    ],
    building: '请选择楼栋',
    bedIndex: 0,
    bedData: ['一号床', '二号床', '三号床', '四号床'],
    bed: '请选择床号'
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
    console.log(e.detail);

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
    console.log(e.detail.value)

    this.setData({
      buildingIndex: e.detail.value,
      building: this.data.buildingData[0][e.detail.value[0]] + '，' + this.data.buildingData[1][e.detail.value[1]]
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})