// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const formatTime = time => {
  time = new Date(time);
  console.log(time);
  const year = time.getFullYear(),
    mouth = time.getMonth() + 1,
    day = time.getDate();
    // 云函数的时区是utc+0的，本地是+8的，所以要+8
    // hour = time.getHours() + 8
    // minutes = time.getMinutes()

  return year + '/' + mouth + '/' + day;
    
}

// 云函数入口函数
exports.main = async (event, context) => {
  const { title } = event;
  const fileID = 'cloud://gdut-netassistant-2019.6764-gdut-netassistant-2019-1259771708/blogs'
  const paths = ['/业务流程/', '/常用教程/', '/常见故障/'];

  if (typeof title === 'undefined') {
    return {
      code: 500,
      info: "titile不能为空"
    }
  };
  // 获取文章的信息，比如阅读量
  const res = await cloud.callFunction({
    name: 'getBlogInfo',
    data: {
      title
    }
  });

  if (res && res.result.length < 0) {
    return {
      code: 500,
      info: "不存在此文章"
    }
  }
  console.log(res);
  // 取出必要信息
  const { type, view, timeStamp } = res.result[0];

  const ret = {
    type,
    title,
    view,
    time: formatTime(timeStamp)
  };
  // 从cdn读取文章内容
  ret.content = await cloud.downloadFile({
    fileID: fileID + paths[parseInt(type)] + title + '.md',
  }).then(res => {
    return res.fileContent.toString('utf8');
  }).catch(err => {
    return {
      code: 500,
      info: err
    }
  }) 
  return ret;
}