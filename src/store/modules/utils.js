export default {
  namespaced: true,
  state() {
    return {
      // !控制登录框的显示
      isLogin: false,
      // !是否喜欢音乐
      isLike: '',
      // !音乐总时长
      totalTime: '',
      currentTime: '',
      targetCurrentTime: '00:00',
      duration: '',
      // !控制大的音乐播放器的显示
      isShow: false,
      // !控制歌词框的显示
      isShowSongWords: false,
      // !歌词滚动
      test: '',
      // !搜索框关键词
      keyWords: '',
      // !控制搜索框的显示
      searchShow: false

    }
  },
  mutations: {
    setLoginStatus(state, status) {
      state.isLogin = status
    },
    setIsLike(state, id) {
      state.isLike = id
    },
    setMusicTotalTime(state, time) {
      state.totalTime = time
    },
    // setCurrentTime(state, currentTime) {
    //   state.currentTime = currentTime
    // },
    setCurrentTime(state, targetCurrentTime) {
      state.targetCurrentTime = targetCurrentTime
    },
    setDuration(state, duration) {
      state.duration = duration
    },
    setShow(state, show) {
      state.isShow = show
    },
    setSongWordsShow(state, newShow) {
      state.isShowSongWords = newShow
    },
    setTest(state, test) {
      state.test = test
    },
    setKeyWords(state, newKeyWords) {
      state.keyWords = newKeyWords
    },
    setSearchShow(state, show) {
      state.searchShow = show
    }
  }
}
