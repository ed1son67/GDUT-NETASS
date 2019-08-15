// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database();

// 云函数入口函数
exports.main = async(event, context) => {
  const fileID = 'cloud://gdut-netassistant-2019.6764-gdut-netassistant-2019-1259771708/blogs'
  const paths = ['/业务流程/', '/常用教程/', '/常见故障/'];
  const title = event.title;

  let data = {};

  await db.collection('blog')
    .where({
      title: title
    })
    .field({
      _id: false
    })
    .limit(1)
    .get()
    .then(res => {
      // 没有查到这篇文章
      if (!res.data.length) return;

      Object.keys(res.data[0]).forEach(key => {
        data[key] = res.data[0][key];
      })
  });

  if(Object.keys(data).length !== 0) {
    await cloud.downloadFile({
      fileID: fileID + paths[data.type] + title + '.md',
    }).then(res => {
      let buffer = res.fileContent
      data['content'] = buffer.toString('utf8');
    }).catch(err => {
      console.warn(err);
      return "";
    })
  }
  
  return data;
}