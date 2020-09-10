// 云函数入口文件
const cloud = require('wx-server-sdk')
// 初始化
cloud.init();
// 引入数据库
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const title = event.title
  console.log(title);
  const data = await db.collection('blog')
    .where({
      title
    })
    .limit(1)
    .get()
    .then(res => {
      console.log(res);
      return res.data;
    });

  return data;
}