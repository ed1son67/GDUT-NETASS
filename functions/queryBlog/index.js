// 云函数入口文件
const cloud = require('wx-server-sdk')
// 初始化
cloud.init();
// 引入数据库
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  let page = event.page - 1;
  let type = event.blogType || 0

  let data = db.collection('blog')
            .where({
              type: type 
            })
            .skip(page * 10)
            .limit(10)
            .field({
              _id: false
            })
            .get(); 
  
  
  return data;
}