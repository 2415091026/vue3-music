import request from "../utils/request";

export const testApi = ({type}) => {
  return request("/banner", "get",{type})
}
export const get = () => {
  return request("/personalized/privatecontent","get")
}
