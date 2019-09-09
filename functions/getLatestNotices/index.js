// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  let data = 
    db.collection('Notices')
    .where({
      tab: event.tab
    })
    .limit(10)
    .field({
      "_id": false
    })
    .get()
    .then(res => {
      
      console.log(res.data);
      
      return res;
    });
  return await data;
}