<template>
  <div class="album">
    <div class="top">
      <div class="zhezhao">
        <div class="left">
          <p>top</p>
          <p class="num">50</p>
        </div>

      </div>
      <div class="right">
        <div class="title">
          <h3>热门50首</h3>
          <svg
            class="icon"
            aria-hidden="true"
          >
            <use xlink:href="#icon-bofang2"></use>
          </svg>
          <div class="add">
            <el-icon>
              <folder-add />
            </el-icon>
          </div>
        </div>
        <div class="list">
          <ul :style="{'height': isMore == true ? '100%' : '353px'}">
            <li
              v-for="(item, index) in topSongs"
              :key="item.id"
            >
              <span class="song-index">{{index + 1}} </span>
              <span class="name">{{item.name}}</span>
              <span class="time">{{timeFormat(item.dt)}}</span>
            </li>
          </ul>
          <div
            class="more"
            @click="moreClick"
          >查看全部{{topSongs.length}}首
            <el-icon>
              <arrow-right />
            </el-icon>
          </div>
        </div>
      </div>
    </div>
    <div
      class="album-list"
      v-for="item in musicList"
      :key="item.id"
    >
      <div
        class="img"
        @click="albumClick(item)"
      >
        <img
          v-lazy="item[0].al.picUrl"
          alt=""
        >
      </div>
      <div class="list">
        <h3>{{item[0].al.name}}</h3>
        <ul :style="{'height': item.length > 10 ? '353px' : auto}">
          <li
            v-for="(items, index) in item"
            :key="index"
          >
            <span>{{index + 1}}</span>
            <span>{{items.name}}</span>
          </li>

        </ul>
        <div
          class="more"
          @click="albumClick(item)"
          v-if="item.length > 10"
        >查看全部{{item.length}}首
          <el-icon>
            <arrow-right />
          </el-icon>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import { ref, onMounted, nextTick } from "vue";
import { useRoute } from "vue-router";
import { getHotSongs, getSongerAlbum, getAlbumMusic } from "../../../api/main";
import { FolderAdd, ArrowRight } from "@element-plus/icons-vue";
import { resultProps } from "element-plus";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  components: {
    FolderAdd,
    ArrowRight,
  },
  setup(props) {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const topSongs = ref([]);
    const isMore = ref(false);
    const id = route.query.id;
    const hotAlbums = ref([]);
    const musicList = ref([]);
    const timeFormat = (times) => {
      // !时间戳一般是毫秒,将毫秒转换成秒
      let time = times / 1000;
      let m = Math.floor(time / 60);
      m = m > 10 ? m : "0" + m;
      let s = Math.floor(time) % 60;
      s = s >= 10 ? s : "0" + s;
      return m + ":" + s;
    };
    onMounted(() => {
      getHotSongs({ id: id }).then((res) => {
        console.log("top", res);
        topSongs.value = res.songs;
      });
    });
    const getAlbum = onMounted(() => {
      getSongerAlbum({ id: id }).then((res) => {
        console.log("zhuanji", res);
        hotAlbums.value = res.hotAlbums;
        nextTick(() => {
          for (let i = 0; i < res.hotAlbums.length; i++) {
            getAlbumMusic({ id: res.hotAlbums[i].id }).then((res) => {
              // console.log("专辑歌曲", res.songs);
              musicList.value.push(res.songs);
            });
          }
          console.log(musicList.value, "test");
        });
      });
    });

    const moreClick = () => {
      isMore.value = !isMore.value;
    };
    const albumClick = (item) => {
      console.log(item[0].al.id);
      store.commit("utils/setStatus", "album");
      router.push({
        path: "/main/find/songList",
        query: { id: item[0].al.id },
      });
    };
    return {
      topSongs,
      isMore,
      hotAlbums,
      musicList,
      timeFormat,
      moreClick,
      albumClick,
    };
  },
};
</script>
<style lang="less" scoped>
.album {
  .top {
    display: flex;
    margin-top: 20px;
    .zhezhao {
      width: 150px;
      height: 150px;
      background: linear-gradient(
          to bottom,
          rgba(255, 255, 255, 0.15) 0%,
          rgba(0, 0, 0, 0.15) 100%
        ),
        radial-gradient(
            at top center,
            rgba(255, 255, 255, 0.4) 0%,
            rgba(0, 0, 0, 0.4) 120%
          )
          #989898;
      background-blend-mode: multiply, multiply;
      border-radius: 10px;
      .left {
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: center;
        width: 150px;
        height: 150px;
        p {
          font-size: 40px;
          color: #fff;
          font-weight: bold;
        }
        p.num {
          font-size: 50px;
        }
        img {
          width: 150px;
          height: 150px;
        }
      }
    }
    .right {
      width: 100%;
      margin-left: 28px;
      .title {
        display: flex;
        height: 30px;
        line-height: 30px;
        .icon {
          margin: 0 18px;
          width: 18px;
          cursor: pointer;
        }
        .add {
          font-size: 18px;
          margin-top: 3px;
          cursor: pointer;
        }
      }
      .list {
        ul {
          height: 353px;
          overflow: hidden;
          li {
            display: flex;
            padding: 0 15px;
            height: 35px;
            line-height: 35px;
            font-size: 14px;
            &:hover {
              background-color: #f0f1f2 !important;
            }
            &:nth-child(odd) {
              background-color: #f9f9f9;
            }
            .song-index {
              margin-right: 8px;
            }
            .name {
              flex: 8;
            }
            .time {
              flex: 2;
            }
          }
        }
        .more {
          display: flex;
          align-items: center;
          width: 100%;
          height: 35px;
          line-height: 35px;
          font-size: 14px;
          padding: 0 15px;
          background-color: #f9f9f9;
          color: #9b9b9b;
          cursor: pointer;
        }
      }
    }
  }
  .album-list {
    display: flex;
    margin-top: 20px;
    img {
      width: 150px;
      height: 150px;
      cursor: pointer;
    }
    .list {
      width: 100%;
      margin-left: 28px;

      ul {
        margin-top: 10px;
        // height: 353px;
        overflow: hidden;
        li {
          display: flex;
          padding: 0 15px;
          height: 35px;
          line-height: 35px;
          font-size: 14px;
          &:hover {
            background-color: #f0f1f2 !important;
          }
          &:nth-child(odd) {
            background-color: #f9f9f9;
          }
          .song-index {
            margin-right: 8px;
          }
          .name {
            flex: 8;
          }
          .time {
            flex: 2;
          }
        }
      }
    }
    .more {
      display: flex;
      align-items: center;
      width: 100%;
      height: 35px;
      line-height: 35px;
      font-size: 14px;
      padding: 0 15px;
      background-color: #f9f9f9;
      color: #9b9b9b;
      cursor: pointer;
    }
  }
}
</style>
