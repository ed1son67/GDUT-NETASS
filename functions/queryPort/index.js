// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  
  return await db.collection('port')
    .where({
      building: event.building,
      room: event.room
    })
    .limit(1)
    .field({
      _id: false,
      building: false,
      room: false
    }).get().then(res => res.data.length ? res.data[0].ports[event.bed] : "")
}