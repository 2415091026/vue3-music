export default {
  namespaced: true,
  state() {
    return {
      songInfo: {
        // !歌曲id
        songId: '',
        // !歌曲名称
        songName: '',
        // !歌手
        songer: '',
        // !背景图片
        bgImg: ''
      },
      // !歌曲播放地址
      songUrl: '',
      // !当前播放的歌曲列表
      currentPlaying: [],
        // !前播放歌曲的index
      currentSongIndex: '',
      // !当前歌曲是否在播放,,,,,true为暂停
      isPlaying: true,
      // !歌词
      lyric: [],
      // !当前播放的时显示的歌词
      curretntLyrics: '',
      currentIndexs: '',
      allSongsList: [],
    }
  },
  mutations: {
    setSongInfo(state, newInfo) {
      state.songInfo.songId = newInfo.id
      state.songInfo.songName = newInfo.name
      state.songInfo.songer = newInfo.ar[0].name
      state.songInfo.bgImg = newInfo.al.picUrl
    },
    setSongInfoTwo(state, newInfos) {
      state.songInfo.songId = newInfos.id
      state.songInfo.songName = newInfos.name
      state.songInfo.songer = newInfos.artists[0].name
      state.songInfo.bgImg = newInfos.artists[0].img1v1Url
    },
    setPlayUrl(state, url) {
      state.songUrl = url
    },
    setCurrentPlayingSongs(state, playingList) {
      state.currentPlaying = playingList
    },
    setCurrentSongIndex(state, indexs) {
      state.currentSongIndex = indexs
    },
    setIsPlaying(state, newValues) {
      state.isPlaying = newValues
    },
    setLyric(state, lyric) {
      state.lyric = lyric
    },
    setCurretntLyrics(state, curretntLyrics) {
      state.curretntLyrics = curretntLyrics
    },
    setCurrentIndexs(state, currentIndexs) {
      state.currentIndexs = currentIndexs
    },
    setAllSongsList(state, newList) {
      state.allSongsList = newList
    }
  }
}
