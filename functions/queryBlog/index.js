// 云函数入口文件
const cloud = require('wx-server-sdk')
// 初始化
cloud.init();
// 引入数据库
const db = cloud.database()

const formatTime = time => {
  let year = time.getFullYear(),
    mouth = time.getMonth() + 1,
    day = time.getDate(),
    // 云函数的时区是utc+0的，本地是+8的，所以要+8
    hour = time.getHours() + 8
    minutes = time.getMinutes()

  return year + '/' + mouth + '/' + day + ' ' + hour  + ':' + minutes;
    
}
// 云函数入口函数
exports.main = async (event, context) => {
  let page = event.page - 1;
  let type = event.blogType || 0;

  let data = db.collection('blog')
    .orderBy('timeStamp', 'desc')
    .where({
      type: type
    })
    .skip(page * 10)
    .limit(10)
    .field({
      _id: false
    })
    .get()
    .then(res => {
      if (res) {
        for (let obj of res.data) {
          obj.timeStamp = formatTime(obj.timeStamp);
          console.log(obj.timeStamp);
          
        }
      }

      return res;
    });

  return await data;
}