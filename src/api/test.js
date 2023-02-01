import request from "../utils/request";

export const testApi = ({type}) => {
  return request("/banner", "get",{type})
}
export const get = ({keywords='孤勇者' }) => {
  return request("/search/multimatch","get",{keywords })
}
export const userBind = () => {
  return request('/user/account',"get")
}
