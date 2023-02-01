<template>
  <div class="recommend">
    <div class="container">

      <div class="banner">
        <div
          class="banner-skeleton"
          v-if="!bannerList.length"
        >
          <el-skeleton
            :rows="0"
            animated
          />
        </div>
        <el-carousel
          :interval="4000"
          type="card"
          height="200px"
          v-else
        >
          <el-carousel-item
            v-for="item in bannerList"
            :key="item.bannerId"
          >
            <img
              :src="item.imageUrl"
              alt=""
            >
            <div
              :class="{'other': item.typeTitle === '歌单' || item.typeTitle === '专题' || item.typeTitle === '活动'}"
              class="type"
            >
              <span>{{item.typeTitle}}</span>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <!-- 推荐歌单 -->
      <div class="recommend-song-list">
        <main-header-nav title="推荐歌单">
          <el-icon>
            <arrow-right-bold />
          </el-icon>
        </main-header-nav>
        <recommend-song-list></recommend-song-list>
      </div>
      <!-- 独家放送 -->
      <div class="exclusive">
        <main-header-nav title="独家放送">
          <el-icon>
            <arrow-right-bold />
          </el-icon>
        </main-header-nav>
        <div class="exclusive-list">
          <div
            class="exclusive-img"
            v-for="item in personalized"
            :key="item.id"
          >
            <img
              :src="item.sPicUrl"
              alt=""
            >
            <p>{{item.copywriter}}</p>
          </div>

        </div>
      </div>

    </div>

  </div>
</template>
<script>
import { ref, onMounted } from "vue";
import { getBanner, getPersonalized } from "../../api/main";
import MainHeaderNav from "../../components/main-header-nav";
import RecommendSongList from "./cpns/recommend-song-list";
import { ArrowRightBold } from "@element-plus/icons-vue";
export default {
  components: {
    MainHeaderNav,
    RecommendSongList,
    ArrowRightBold,
  },
  setup(props) {
    const bannerList = ref([]);
    const personalized = ref([]);
    onMounted(() => {
      getBanner({ type: "0" }).then((res) => {
        // console.log(res);
        bannerList.value = res.banners;
      });
      getPersonalized().then((res) => {
        // console.log("独家", res);
        personalized.value = res.result;
      });
    });
    return {
      bannerList,
      personalized,
    };
  },
};
</script>
<style lang="less" scoped>
.container {
  width: 50%;
  margin: 0 auto;
  .banner {
    position: relative;
    img {
      width: 550px;
      height: 200px;
      background-size: cover;
      border-radius: 20px;
    }
    .type {
      width: 70px;
      height: 20px;
      line-height: 20px;
      font-size: 13px;
      position: absolute;
      bottom: 0;
      right: 40px;
      background-color: #cc4a4a;
      border-top-left-radius: 10px;
      border-bottom-right-radius: 10px;
      overflow: hidden;
      span {
        display: flex;
        justify-content: center;
        color: #fff;
      }
    }
    .other {
      background-color: #4a79cc !important;
    }
  }
  .recommend-song-list .header-nav,
  .exclusive .header-nav {
    // margin-right: 12px;
    font-size: 20px;
    font-weight: 600;
    cursor: pointer;
  }
  .exclusive {
    margin-bottom: 100px;
    width: 100%;
    .exclusive-list {
      display: flex;
      justify-content: space-between;
      .exclusive-img {
        display: flex;
        flex-flow: column;
        img {
          width: 355px;
          height: 200px;
          background-size: cover;
          border-radius: 10px;
        }
        p {
          font-size: 13px;
          margin-top: 10px;
        }
      }
    }
  }
}
.el-carousel /deep/ .el-carousel__item {
  border-radius: 20px;
}
.el-carousel /deep/ .is-active {
  border-radius: 20px;
}
.el-skeleton /deep/ .el-skeleton__item {
  width: 100% !important;
  height: 165px !important;
}
</style>
