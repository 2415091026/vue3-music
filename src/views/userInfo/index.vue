<template>
  <div class="user-info">
    <div class="top">
      <div class="user-img">
        <img
          src="	https://p4.music.126.net/GeTALJZspWENZLTvpVHXZA==/109951167239127006.jpg"
          alt=""
        >
      </div>
      <div class="infomation">
        <div class="name">
          <div class="user">
            <p class='user-name'>这个名字没有被占用</p>
            <p class="lv">lv1</p>
          </div>
          <div
            class="mine-btn"
            v-if="isMine"
          >
            <el-button
              round
              @click="setUserInfo"
            >编辑个人资料</el-button>
          </div>
          <div
            class="user-btn"
            v-else
          >

            <el-button round>
              <el-icon>
                <plus />
              </el-icon>
              加关注
            </el-button>
            <el-button round>
              <el-icon>
                <message />
              </el-icon>
              发私信
            </el-button>
            <el-button round>
              <el-icon>
                <headset />
              </el-icon>
              歌手页
            </el-button>
          </div>
        </div>
        <div class="count">
          <div class="dynamic">
            <p class="num">168</p>
            <p class="words">动态</p>
          </div>
          <div class="attention">
            <p class="num">168</p>
            <p class="words">关注</p>
          </div>
          <div class="fans">
            <p class="num">168</p>
            <p class="words">粉丝</p>
          </div>
        </div>
        <div class="desc">
          <p>社交网络:未绑定</p>
          <p>个人介绍: 暂无介绍</p>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import { Headset, Message, Plus } from "@element-plus/icons-vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { computed, onMounted, ref } from "vue";
export default {
  components: {
    Headset,
    Message,
    Plus,
  },
  setup(porps) {
    const store = useStore();
    const router = useRouter();
    const setUserInfo = () => {
      router.push("/main/userinfo/madification");
    };
    const isMine = computed(() => {
      return store.state.utils.isMine;
    });
    return {
      isMine,
      setUserInfo,
    };
  },
};
</script>
<style lang="less" scoped>
.user-info {
  padding: 20px;
  .top {
    display: flex;
    .user-img {
      img {
        height: 185px;
        width: 185px;
        border-radius: 50%;
      }
    }
    .infomation {
      width: 100%;
      margin-left: 12px;
      .name {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 0;
        width: 100%;
        border-bottom: 1px solid #e5e5e5;
        .user {
          .user-name {
            font-weight: 600;
            font-size: 22px;
          }
          .lv {
            margin-top: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 30px;
            height: 20px;
            background-color: #f0f0f0;
            font-size: 12px;
            border-radius: 15px;
          }
        }

        .el-button {
          float: right;
        }
      }
      .count {
        display: flex;
        margin-top: 18px;
        .dynamic,
        .attention {
          width: 75px;
          height: 40px;
          border-right: 1px solid #e6e6e6;
          text-align: center;

          .num {
            font-size: 16px;
            font-weight: 600;
          }
        }
        .fans {
          width: 75px;
          height: 40px;
          text-align: center;
          .num {
            font-size: 16px;
            font-weight: 600;
          }
        }
      }
      .desc {
        margin-top: 22px;
        font-size: 13px;
        line-height: 26px;
      }
    }
  }
}
</style>
