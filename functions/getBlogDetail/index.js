// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event.title)
  if (!event.title) return;

  const fileID = 'cloud://gdut-netassistant-2019.6764-gdut-netassistant-2019-1259771708/blogs'
  const paths = ['/业务流程/', '/常用教程/', '/常见故障/'];
  return await cloud.downloadFile({
    fileID: fileID + paths[parseInt(event.type)] + event.title + '.md',
  }).then(res => {
    let buffer = res.fileContent
    return buffer.toString('utf8');
  }).catch(err => {
    console.warn(err);
    return "";
  }) 

}