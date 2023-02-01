import request from "../utils/request"
// !搜索框默认关键词
export const getDefaultSearch = () => {
  return request('/search/default',"get")
}
// !获取热搜列表
export const getHotSearch = () => {
  return request('/search/hot/detail',"get")
}
// !发起搜索
export const sendSearch = ({keywords }) => {
  return request('/cloudsearch',"get",{keywords })
}
// !搜索建议
export const searchSuggest = ({keywords }) => {
  return request('/search/suggest',"get",{keywords })
}
// 搜索多重匹配
export const getMultimatch = ({keywords}) => {
  return request('/search/multimatch','get',{keywords })
}
