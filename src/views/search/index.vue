<template>
  <div class="search">
    <el-scrollbar height="1000px">
      <!-- 当输入框没有输入时显示这个 -->
      <div
        class="moren"
        v-if="!keyWords"
      >
        <div class="title">热搜榜</div>
        <div class="content">
          <ul>
            <li
              v-for="(item, index) in hotSearchList"
              :key="index"
              @click="search(item.searchWord)"
            >
              <div class="search-index">{{index +1}}</div>
              <div class="desc">
                <div class="search-word">{{item.searchWord}}</div>
                <div
                  class="search-content"
                  v-if="item.content"
                >{{item.content}}</div>
              </div>

            </li>

          </ul>
        </div>
      </div>
      <!-- 当输入框输入文字时显示这个 -->
      <div
        class="haveKeyWords"
        v-else
      >
        <!-- 单曲 -->
        <div
          class="songs"
          v-show="songsList"
        >
          <div class="title">
            <el-icon>
              <headset />
            </el-icon>
            <span>单曲</span>
          </div>
          <div class="songs-list">
            <ul>
              <li
                v-for="item in songsList"
                :key="item.id"
                @click="play(item)"
              ><span
                  class="song-name"
                  :class="{'key': keyWords == item.name}"
                >{{item.name}}</span>
                <span
                  class="author"
                  :class="{'key': keyWords == item.artists[0].name}"
                >-{{item.artists[0].name}}</span>
              </li>
            </ul>
          </div>
        </div>
        <!-- 歌手 -->
        <div
          class="songer"
          v-show="artists"
        >
          <div class="title">
            <el-icon>
              <user />
            </el-icon>
            <span>歌手</span>
          </div>
          <div class="songs-list">
            <ul>
              <li
                v-for="item in artists"
                :key="item.id"
              ><span
                  class="song-name"
                  :class="{'key': keyWords == item.name}"
                >{{item.name}}</span>
              </li>
            </ul>
          </div>
        </div>
        <!-- 专辑 -->
        <div
          class="albums"
          v-show="albums"
        >
          <div class="title">
            <el-icon>
              <help-filled />
            </el-icon>
            <span>专辑</span>
          </div>
          <div class="songs-list">
            <ul>
              <li
                v-for="item in albums"
                :key="item.id"
              ><span
                  class="song-name"
                  :class="{'key': keyWords == item.name}"
                >{{item.name}}</span>
                <span
                  class="author"
                  :class="{'key': keyWords == item.artist.name}"
                >-{{item.artist.name}}</span>
              </li>
            </ul>
          </div>
        </div>
        <!-- 歌单 -->
        <div
          class="playlist"
          v-show="playlists"
        >
          <div class="title">
            <el-icon>
              <operation />
            </el-icon>
            <span>歌单</span>
          </div>
          <div class="songs-list">
            <ul>
              <li
                v-for="item in playlists"
                :key="item.id"
              ><span
                  class="song-name"
                  :class="{'key': keyWords == item.name}"
                >{{item.name}}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </el-scrollbar>

  </div>
</template>
<script>
import { useStore } from "vuex";
import { computed, onMounted, ref, nextTick, watch } from "vue";
import { getHotSearch, sendSearch, searchSuggest } from "../../api/search";
import { useRouter } from "vue-router";
import { Headset, User, HelpFilled, Operation } from "@element-plus/icons-vue";
import { getSongInfo, getLyric, getRecently } from "../../api/songs";
export default {
  components: {
    Headset,
    User,
    HelpFilled,
    Operation,
  },
  setup(props) {
    const store = useStore();
    const router = useRouter();
    const keyWords = computed(() => {
      return store.state.utils.keyWords;
    });
    const hotSearchList = ref([]);
    onMounted(() => [
      getHotSearch().then((res) => {
        console.log("热搜", res);
        hotSearchList.value = res.data;
      }),
    ]);
    const search = (keyWords) => {
      router.push({ path: "/main/search", query: { keywords: keyWords } });
    };
    // !单曲
    const songsList = computed(() => {
      return store.state.search.searchSuggest.songs;
    });
    // !歌手
    const artists = computed(() => {
      return store.state.search.searchSuggest.artists;
    });
    // !专辑
    const albums = computed(() => {
      return store.state.search.searchSuggest.albums;
    });
    // !歌单
    const playlists = computed(() => {
      return store.state.search.searchSuggest.playlists;
    });
    // !点击单曲时候直接播放
    const play = (item) => {
      console.log(item);
      // !保存歌曲信息
      store.commit("music/setSongInfoTwo", item);
      nextTick(() => {
        getSongInfo({ id: item.id }).then((res) => {
          console.log("url", res);
          // !保存歌曲url
          store.commit("music/setPlayUrl", res.data[0].url);
        });
        // !获取歌词
        getLyric({ id: item.id }).then((res) => {
          console.log("歌词", res);
          store.commit("music/setLyric", res.lrc.lyric);
        });
        // !在这里直接点击播放时,需要将最近播放的歌曲传入到正在播放的列表
        // !获取最近播放的歌曲列表
        getRecently({ limit: "100" }).then((res) => {
          console.log("最近播放", res);
        });
      });
    };
    watch(
      () => store.state.utils.searchShow,
      (val) => {
        console.log(val);
        if (val == false) {
          store.commit("utils/setKeyWords", "");
        }
      }
    );
    return {
      keyWords,
      hotSearchList,
      songsList,
      artists,
      albums,
      playlists,
      search,
      play,
    };
  },
};
</script>
<style lang="less" scoped>
.search {
  .moren {
    .title {
      padding: 20px 20px 10px 20px;
      font-size: 15px;
      color: #8d8d8d;
    }
    .content {
      ul {
        li {
          display: flex;
          align-items: center;
          padding-left: 8px;
          height: 55px;
          cursor: pointer;
          .search-index {
            flex: 1;
            color: #d3d3d3;
          }
          .desc {
            flex: 9;
            height: 55px;
            display: flex;
            flex-flow: column;
            justify-content: space-around;
            .search-word {
              font-size: 13px;
            }
            .search-content {
              font-size: 11px;
              color: #8d8d8d;
            }
          }
          &:hover {
            background-color: #f3f3f3;
          }
          &:nth-child(-n + 3) .search-index {
            color: red;
          }
          &:nth-child(-n + 3) .search-word {
            font-weight: 600;
          }
        }
      }
    }
  }
  .haveKeyWords {
    .songs,
    .songer,
    .albums,
    .playlist {
      .title {
        display: flex;
        align-items: center;
        padding: 20px 10px 10px 10px;
        height: 35px;

        span {
          margin-left: 8px;
          font-size: 13px;
        }
      }
      .songs-list {
        ul {
          li {
            height: 35px;
            line-height: 35px;
            padding-left: 32px;
            font-size: 13px;
            cursor: pointer;
            &:hover {
              background-color: #f3f3f3;
            }
            span {
              &.key {
                color: #507daf;
              }
            }
          }
        }
      }
    }
  }
}
</style>
