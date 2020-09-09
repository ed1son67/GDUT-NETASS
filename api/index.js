/**
 * 导出所有的云函数
 */
const GET_BLOG_LIST = 'getBlogList';
const GET_BLOG = 'getBlog';
const QUERY_PORT = 'queryPort';
const GET_BLOG_DETAIL = 'getBlogDetail';

const getBlogDetail = (data) => {
  return wx.cloud.callFunction({
    name: GET_BLOG_DETAIL,
    data
  })
}

const getBlog = (data) => {
  return wx.cloud.callFunction({
    name: GET_BLOG,
    data
  });
}

const getBlogList = (data) => {
  return wx.cloud.callFunction({
    name: GET_BLOG_LIST,
    data
  })
}

const getPort = (data) => {
  return wx.cloud.callFunction({
    name: QUERY_PORT,
    data
  })
}

module.exports = {
  getBlogList,
  getBlogDetail,
  getBlog,
  getPort
}