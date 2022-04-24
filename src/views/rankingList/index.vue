<template>
  <div class="ranking-list">
    <div
      class="container"
      :style="{'width': clientWidth == '2560' ? '50%' : '70%' }"
    >
      <div class="title">
        <main-header-nav title="官方榜"></main-header-nav>
      </div>
      <div class="list">
        <ranking-cpns
          :soaring="soaring"
          :soaringList="soaringList"
        ></ranking-cpns>
        <ranking-cpns
          :newList='newList'
          :newSongList='newSongList'
        ></ranking-cpns>
        <ranking-cpns
          :original='original'
          :originalSongList="originalSongList"
        ></ranking-cpns>
        <ranking-cpns
          :hotList='hotList'
          :hotSongList="hotSongList"
        ></ranking-cpns>
      </div>
      <div class="world">
        <main-header-nav title="全球榜"></main-header-nav>
        <div class="world-buzhidao">
          <div
            class="world-list"
            v-for="item in worldList"
            :key="item.id"
            @click="toSongList(item)"
          >
            <img
              :src="item.coverImgUrl"
              alt=""
            >
            <p class="desc">{{item.name}}</p>
            <p class="count">
              <el-icon>
                <caret-right />
              </el-icon>
              {{ format(item.playCount)}}
            </p>
            <p class="player">
              <el-icon>
                <CaretRight />
              </el-icon>
            </p>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
import { onMounted, ref, nextTick } from "vue";
import MainHeaderNav from "../../components/main-header-nav";
import RankingCpns from "./cpns/ranking-cpns";
import { getTopList } from "../../api/songs";
import { getAllSongs } from "../../api/main";
import { CaretRight } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  components: {
    MainHeaderNav,
    RankingCpns,
    CaretRight,
  },
  setup(props) {
    const store = useStore();
    const router = useRouter();
    // 屏幕宽度
    const clientWidth = ref("");
    // 飙升榜
    const soaring = ref([]);
    const soaringId = ref("");
    const soaringList = ref([]);
    // 新歌榜
    const newList = ref([]);
    const newListId = ref();
    const newSongList = ref([]);
    // 原创榜
    const original = ref([]);
    const originalId = ref();
    const originalSongList = ref([]);
    // 热歌榜
    const hotList = ref([]);
    const hotListId = ref();
    const hotSongList = ref([]);

    const worldList = ref([]);
    onMounted(() => {
      let screenWidth = document.documentElement.clientWidth;
      clientWidth.value = screenWidth;
      // console.log(document.documentElement.clientWidth);
      getTopList().then((res) => {
        console.log("榜单", res);

        soaring.value = res.list[0];
        soaringId.value = res.list[0].id;
        newList.value = res.list[1];
        newListId.value = res.list[1].id;
        original.value = res.list[2];
        originalId.value = res.list[2].id;
        hotList.value = res.list[3];
        hotListId.value = res.list[3].id;

        console.log(soaringId.value);
        nextTick(() => {
          getAll(res.list[0].id, res.list[0].name);
          getAll(newListId.value, res.list[1].name);
          getAll(originalId.value, res.list[2].name);
          getAll(hotListId.value, res.list[3].name);
          worldList.value = res.list.splice(4);
        });
      });
    });
    const getAll = (id, name) => {
      switch (name) {
        case "飙升榜": {
          getAllSongs({ id: id }).then((res) => {
            soaringList.value = res.songs;
            console.log(res, "白哦");
          });
          break;
        }
        case "新歌榜": {
          getAllSongs({ id: id }).then((res) => {
            newSongList.value = res.songs;
          });
          break;
        }
        case "原创榜": {
          getAllSongs({ id: id }).then((res) => {
            originalSongList.value = res.songs;
          });
          break;
        }
        case "热歌榜": {
          getAllSongs({ id: id }).then((res) => {
            hotSongList.value = res.songs;
          });
          break;
        }
      }
    };
    const toSongList = (item) => {
      router.push({ path: "/main/find/songList", query: { id: item.id } });
      store.commit("utils/setStatus", "songList");
      console.log(item);
    };
    const format = (count) => {
      if (count > 100000000) {
        return (count / 100000000).toFixed(0) + "亿";
      } else if (count > 1000000) {
        return (count / 10000).toFixed(0) + "万";
      } else if (count > 100000) {
        return (count / 1000).toFixed(0) + "万";
      }
    };
    return {
      clientWidth,
      soaring,
      newList,
      original,
      hotList,
      soaringId,
      newListId,
      originalId,
      hotListId,
      getAll,
      soaringList,
      newSongList,
      originalSongList,
      hotSongList,
      worldList,
      format,
      toSongList,
    };
  },
};
</script>
<style lang="less" scoped>
.ranking-list {
  .container {
    width: 80%;
    margin: 0 auto;
    .title {
      font-weight: 600;
    }
    .world {
      margin-bottom: 100px;
      .header-nav {
        font-weight: 600;
      }
      .world-buzhidao {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .world-list {
          position: relative;
          width: 205px;
          margin-bottom: 20px;
          cursor: pointer;
          img {
            width: 205px;
            height: 205px;
            border-radius: 8px;
          }
          .count {
            position: absolute;
            top: 5px;
            right: 5px;
            display: flex;
            align-content: center;
            color: #fff;
            font-size: 10px;
            .el-icon {
              font-size: 15px;
            }
          }
          .player {
            display: flex;
            // align-content: center;
            // text-align: center;
            justify-content: center;
            position: absolute;
            top: 32%;
            left: 40%;
            width: 35px;
            height: 35px;
            border-radius: 50%;
            background-color: #eaeae9;
            line-height: 35px;
            opacity: 0;
            .el-icon {
              line-height: 30px;
              font-size: 30px;
              color: red;
              border-radius: 3px;
            }
          }
          &:hover .player {
            opacity: 1;
          }
        }
      }
    }
  }
}
</style>
