import request from "../utils/request";

export const testApi = ({type}) => {
  return request("/banner", "get",{type})
}
export const get = () => {
  return request("/toplist","get")
}
export const userBind = ({uid}) => {
  return request('/user/detail',"get",{uid})
}
