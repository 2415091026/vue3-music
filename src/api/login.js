import request from "../utils/request"
// !手机登录
export const loginByPhone = ({phone, password}) => {
  return request("/login/cellphone", "post",{phone, password})
}
// !退出登录
export const logout = () => {
  return request("/logout","get")
}
// !获取登录状态
export const getLoginStatus = () => {
  return request('/login/status',"get")
}
// 调用此接口可生成一个 key
export const getKey = ({timerstamp}) => {
  return request("/login/qr/key","get", {timerstamp})
}
// 调用此接口传入上一个接口生成的 key 可生成二维码图片的 base64 和二维码信息,可使用 base64 展示图片,或者使用二维码信息内容自行使用第三方二维码生成库渲染二维码
export const creatQr = ({key,timerstamp,qrimg}) => {
  return request('/login/qr/create',"get",{key,timerstamp,qrimg})
}
// 轮询此接口可获取二维码扫码状态,800 为二维码过期,801 为等待扫码,802 为待确认,803 为授权登录成功(803 状态码下会返回 cookies)
export const check = ({key,timerstamp}) => {
  return request('/login/qr/check',"get",{key,timerstamp})
}
