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
// 获取歌手列表
export const getSonger = ({limit,initial,type,area,offset}) => {
  return request('/artist/list', "get",{limit,initial,type,area,offset})
}
// 获取歌手详情
export const getSongerInfo = ({id}) => {
  return request("/artist/detail","get",{id})
}
// 获取歌手热门 50 首歌曲
export const getHotSongs = ({id}) => {
  return request('/artist/top/song', "get", {id})
}
// 获取歌手专辑
export const getSongerAlbum = ({id,offset}) => {
  return request('/artist/album',"get",{id,offset})
}
// 获取专辑内容
export const getAlbumMusic = ({id}) => {
  return request('/album','get',{id})
}
