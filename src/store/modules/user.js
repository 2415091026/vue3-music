export default {
  namespaced: true,
  state() {
    return {
      profile: {
        avatarUrl: '',
        birthday: '',
        nickname: '',
        userId: '',
        token: ''
      },
      songerInfo: []
    }
  },
  actions: {

  },
  mutations: {
    setProfle(state, { avatarUrl, birthday, nickname, userId,token }) {
      state.avatarUrl = avatarUrl
      state.birthday = birthday
      state.nickname = nickname
      state.userId = userId
      state.token = token
    },
    setSongInfo(state, newArr) {
      state.songerInfo = newArr
    }
  }
}
