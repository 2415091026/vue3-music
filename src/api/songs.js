import request from "../utils/request"

// !获取音乐 url
export const getSongInfo = ({id,realIP='116.25.146.177'}) => {
  return request("/song/url","get",{id,realIP})
}
// !获取搜索的歌曲
export const searchMusic = ({keywords}) => {
  return request('/cloudsearch',"get",{keywords})
}
// !获取歌词
export const getLyric = ({ id }) => {
  return request("/lyric","get", {id})
}
// !获取最近播放的歌曲
export const getRecently = ({limit}) => {
  return request('/record/recent/song',"get",{limit})
}
// !新版评论接口
export const newComment = ({id,type="0",sortType='3'}) => {
  return request("/comment/new","get",{id,type,sortType})
}
// 获取排行榜
export const getTopList = () => {
  return request('/toplist',"get")
}
