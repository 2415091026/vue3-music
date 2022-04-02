import request from "../utils/request"
// !手机登录
export const loginByPhone = ({phone, password}) => {
  return request("/login/cellphone", "post",{phone, password})
}
