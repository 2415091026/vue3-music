<template>
  <div class="dailySongs">

    <div
      class="recommend-song-list"
      v-if="dailyRecommendList.length"
    >
      <div
        class="dailySongs-box"
        @click="dailyClick"
      >
        <div class="bg-cover"></div>
        <img
          :src="getBackgroundImage"
          alt=""
        >
        <div class="time"><span>{{day}}</span></div>
        <div class="words">每日歌曲推荐</div>
      </div>
      <div
        class="recommend-box"
        v-for="item in dailyRecommendList"
        :key="item.id"
        @click="recommendClick(item.id)"
      >
        <img
          :src="item.picUrl"
          alt=""
        >
        <p>{{item.name}}</p>
      </div>

    </div>
    <div
      class="daily-skeleton"
      v-else
    >
      <el-skeleton
        :rows="0"
        animated
        v-for="item in 10"
      />
    </div>

  </div>
</template>
<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import {
  getRecommendDaily,
  getRecommendSongList,
  getDailySongList,
} from "../../../api/main";
import { ElMessage } from "element-plus";
import { useStore } from "vuex";
export default {
  components: {},
  setup(props) {
    const router = useRouter();
    const store = useStore();
    const day = ref("");
    const getBackgroundImage = ref("");

    // !每日推荐歌单
    const dailyRecommendList = ref([]);
    onMounted(() => {
      let date = new Date();
      day.value = date.getDate();
      getRecommendDaily().then((res) => {
        getBackgroundImage.value = res.data.dailySongs[0].al.picUrl;
        // console.log("每日歌曲", res);
      });
      getRecommendSongList({ limit: "9" }).then((res) => {
        // console.log("推荐歌单", res.result.slice(0, 3));
        // recommendList.value = res.result.slice(0, 2);
        getDailySongList()
          .then((ress) => {
            // console.log(ress.recommend);
            if (ress.recommend.length >= 9) {
              dailyRecommendList.value = ress.recommend.splice(0, 9);
            } else {
              dailyRecommendList.value = ress.recommend.concat(
                res.result.slice(0, 1)
              );
            }
            // switch (ress.recommend.length) {
            //   case 6: {
            //     dailyRecommendList.value = ress.recommend.concat(
            //       res.result.slice(0, 3)
            //     );
            //     break;
            //   }
            //   case 7: {
            //     dailyRecommendList.value = ress.recommend.concat(
            //       res.result.slice(0, 2)
            //     );
            //     break;
            //   }
            //   case 8: {
            //     dailyRecommendList.value = ress.recommend.concat(
            //       res.result.slice(0, 1)
            //     );
            //     break;
            //   }
            //   case 9: {
            //     dailyRecommendList.value = ress.recommend;
            //     break;
            //   }
            //   case 11: {
            //     dailyRecommendList.value = ress.recommend.splice(0, 9);
            //     break;
            //   }
            // }

            // console.log("dailyRecommendList", dailyRecommendList.value);
          })
          .catch((e) => {
            if (e.response) {
              ElMessage.error(e.response.data.msg);
            }
          });
      });
    });
    const dailyClick = () => {
      // console.log("ers");
      router.push("/main/find/dailySongs");
    };
    const recommendClick = (id) => {
      // console.log(id);
      store.commit("utils/setStatus", "songList");
      router.push({ path: "/main/find/songList", query: { id: id } });
    };
    return {
      day,
      getBackgroundImage,
      dailyRecommendList,
      dailyClick,
      recommendClick,
    };
  },
};
</script>
<style lang="less" scoped>
.dailySongs {
  display: flex;
  width: 100%;

  // flex-wrap: wrap;
  .recommend-song-list {
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    .recommend-box {
      width: 205px;
      height: 205px;
      // background-color: pink;
      border-radius: 10px;
      margin: 0 0 50px 0;
    }
    .dailySongs-box {
      // position: relative;
      width: 205px;
      height: 205px;
      // background-color: pink;
      border-radius: 10px;
      overflow: hidden;
      cursor: pointer;
      img {
        width: 205px;
        height: 205px;
        background-size: cover;
      }
      .bg-cover {
        position: absolute;
        margin-top: 0;
        width: 205px;
        height: 205px;
        background-color: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(20px);
        border-radius: 10px;
      }
      .time {
        position: absolute;
        top: 30%;
        left: 29.2%;
        width: 50px;
        height: 50px;
        z-index: 99;
        color: #fff;
        font-size: 36px;
        font-weight: 600;
      }
      .words {
        position: absolute;
        font-size: 14px;
        margin-top: 5px;
      }
    }
    .recommend-box {
      overflow: hidden;
      cursor: pointer;
      img {
        width: 205px;
        height: 205px;
        background-size: cover;
      }
      p {
        width: 205px;
        position: absolute;
        margin-top: 5px;
        font-size: 14px;
      }
    }
  }
  .daily-skeleton {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
}
.el-skeleton /deep/ .el-skeleton__item {
  width: 205px;
  height: 205px;
  margin-bottom: 10px;
}
.el-skeleton {
  width: 205px !important;
}
</style>
