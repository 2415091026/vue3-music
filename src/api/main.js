// !这里是主页的接口
import request from "../utils/request"

// !获取轮播图
export const getBanner = ({type}) => {
  return request("/banner","get",{type})
}
// !获取每日推荐歌曲
export const getRecommendDaily = () => {
  return request("/recommend/songs","get")
}
//! 获取推荐歌单
export const getRecommendSongList = ({limit}) => {
  return request('/personalized', "get", {limit})
}
//! 获取每日推荐歌单
export const getDailySongList = () => {
  return request("/recommend/resource","get")
}
// !获取歌单详情
export const getSongListParticulars = ({id}) => {
  return request("/playlist/detail","get",{id})
}
// !获取歌单里全部歌曲
export const getAllSongs = ({id}) => {
  return request("/playlist/track/all", "get",{id})
}
// !获取歌单的评论
export const getDiscuss = ({id,limit,pageNo,offset}) => {
  return request('/comment/playlist',"get",{id, limit,pageNo,offset})
}
// !获取歌曲详情
export const getMusicInfo = ({ids}) => {
  return request('song/detail',"get",{ids})
}
// !发送评论
export const sendMessage = ({t,type,content,id,commentId}) => {
  return request("/comment","get",{t,type,content,id,commentId})
}
// !获取单曲的评论
export const getSongDiscuss = ({id}) => {
  return request('/comment/music', "get",{id})
}
