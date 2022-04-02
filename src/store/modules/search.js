export default {
  namespaced: true,
  state() {
    return {
      searchSuggest: {
        albums: [],
        artists: [],
        playlists: [],
        songs: []
      }
    }
  },
  mutations: {
    setSearchSuggest(state, newList) {
      state.searchSuggest.albums = newList.albums
      state.searchSuggest.artists = newList.artists
      state.searchSuggest.playlists = newList.playlists
      state.searchSuggest.songs = newList.songs
    }
  }
}
