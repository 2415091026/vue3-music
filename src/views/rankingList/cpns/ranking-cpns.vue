<template>
  <div class="cpns">
    <div class="img">
      <img
        :src="soaring.coverImgUrl || newList.coverImgUrl || original.coverImgUrl || hotList.coverImgUrl"
        alt=""
      >
    </div>
    <div class="cpns-list">
      <ul>
        <li
          v-for="(item, index) in soaringList || newSongList"
          :key="index"
          @click="play(item)"
        >
          <div class="name">{{index + 1}} {{item.name}} <span
              v-if="item.tns"
              v-html="item.tns"
            ></span></div>
          <div class="author">{{item.ar[0].name}}</div>
        </li>
        <li
          v-for="(item, index) in newSongList"
          :key="index"
          @click="play(item)"
        >
          <div class="name">{{index + 1}} {{item.name}} <span
              v-if="item.tns"
              v-html="item.tns"
            ></span></div>
          <div class="author">{{item.ar[0].name}}</div>
        </li>
        <li
          v-for="(item, index) in originalSongList"
          :key="index"
          @click="play(item)"
        >
          <div class="name">{{index + 1}} {{item.name}} <span
              v-if="item.tns"
              v-html="item.tns"
            ></span></div>
          <div class="author">{{item.ar[0].name}}</div>
        </li>
        <li
          v-for="(item, index) in hotSongList"
          :key="index"
          @click="play(item)"
        >
          <div class="name">{{index + 1}} {{item.name}} <span
              v-if="item.tns"
              v-html="item.tns"
            ></span></div>
          <div class="author">{{item.ar[0].name}}</div>
        </li>
      </ul>
      <div
        class="all"
        @click="catAll(soaring.id || newList.id || original.id || hotList.id)"
      >查看全部
        <el-icon>
          <arrow-right />
        </el-icon>
      </div>
    </div>
  </div>

</template>
<script>
import { ArrowRight } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { getSongInfo, getLyric } from "../../../api/songs";
import { plays } from "../../../utils/plays";
import { useStore } from "vuex";
export default {
  props: {
    soaring: {
      type: Array,
      default: () => [],
    },
    soaringList: {
      type: Array,
      default: () => [],
    },
    newList: {
      type: Array,
      default: () => [],
    },
    newSongList: {
      type: Array,
      default: () => [],
    },
    original: {
      type: Array,
      default: () => [],
    },
    originalSongList: {
      type: Array,
      default: () => [],
    },
    hotList: {
      type: Array,
      default: () => [],
    },
    hotSongList: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    ArrowRight,
  },
  setup(props) {
    const router = useRouter();
    const store = useStore();
    const catAll = (id) => {
      // console.log("点击了", id);
      router.push({ path: "/main/find/songList", query: { id: id } });
    };
    const play = (item) => {
      console.log(item);
      store.commit("music/setSongInfo", item);
      getSongInfo({ id: item.id }).then((res) => {
        // console.log(res);
        store.commit("music/setPlayUrl", res.data[0].url);
      });
      getLyric({ id: item.id }).then((res) => {
        // console.log(res, "歌词");
        store.commit("music/setLyric", res.lrc.lyric);
      });
    };
    return {
      catAll,
      play,
    };
  },
};
</script>
<style lang="less" scoped>
.cpns {
  display: flex;
  margin-bottom: 28px;
  .img {
    img {
      width: 170px;
      height: 170px;
      border-radius: 10px;
    }
  }
  .cpns-list {
    margin-left: 22px;
    ul {
      width: 900px;
      height: 175px;
      overflow: hidden;
      li {
        height: 35px;
        line-height: 35px;
        border-radius: 5px;
        display: flex;
        justify-content: space-between;
        padding: 0 8px;
        font-size: 13px;
        cursor: pointer;
        .name {
          span {
            color: #c698c6;
          }
        }
        .author {
          color: #ba9bca;
        }
        &:hover {
          background-color: #f4f4f4 !important;
        }
        &:nth-child(odd) {
          background-color: #f9f9f9;
        }
      }
    }
    .all {
      display: flex;
      align-items: center;
      color: #676767;
      font-size: 14px;
      margin-top: 8px;
      margin-left: 8px;
      cursor: pointer;
    }
  }
}
</style>
