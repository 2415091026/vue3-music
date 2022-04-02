import request from "../utils/request"

// !获取音乐 url
export const getSongInfo = ({id}) => {
  return request("/song/url","get",{id})
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
