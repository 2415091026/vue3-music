import request from "../utils/request";

export const testApi = ({type}) => {
  return request("/banner", "get",{type})
}
export const get = ({uid}) => {
  return request("/msg/private/history","get",{uid})
}
export const userBind = () => {
  return request('/user/account',"get")
}
