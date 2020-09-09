/**
 * 导出所有的云函数
 */
const GET_BLOG_LIST = 'getBlogList';
const QUERY_PORT = 'queryPort';

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

const getBlogList = ({page, blogType}) => {
  return wx.cloud.callFunction({
    name: GET_BLOG_LIST,
    data: {
      page,
      blogType
    }
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
  getBlogList
}