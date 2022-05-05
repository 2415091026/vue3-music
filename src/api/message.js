import request from "../utils/request";

export const getMessage = () => {
  return request('/msg/private','get')
}
// 私信内容
export const getContent = ({uid}) => {
  return request('/msg/private/history','get',{uid})
}
