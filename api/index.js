/**
 * 导出所有的云函数
 */
const GET_BLOG_LIST = 'getBlogList';
const GET_BLOG = 'getBlog';
const QUERY_PORT = 'queryPort';
const GET_BLOG_DETAIL = 'getBlogDetail';

const cloudFunction = ({ name, data }) => {
  return wx.cloud.callFunction({
    name,
    data
  }).catch((err) => {
    // 全局的一个错误拦截处理器
    // 记得reject出去，不然后面的catch拿不到err
    Promise.reject(err);
  });
}

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

/**
 * 获取博客的列表
 */
const getBlogList = (data) => {
  return wx.cloud.callFunction({
    name: GET_BLOG_LIST,
    data
  })
}

const getPort = ({page, blogType}) => {
  return wx.cloud.callFunction({
    name: QUERY_PORT,
    data: {
      page,
      blogType
    }
  })
}

module.exports = {
  getBlogList,
  getBlogDetail,
  getBlog
}