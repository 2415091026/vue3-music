<template>
  <div class="detail">
    <div class="top">
      <div
        class="back"
        @click="back"
      >
        <el-icon>
          <arrow-left-bold />
        </el-icon>
      </div>
      <div class="name">{{nickname}}</div>
    </div>
    <el-scrollbar height="1330px">
      <div
        class="msg-list"
        v-for="item in promotion"
      >
        <div class="msg">
          <div class="time">
            <span>今天14:19</span>
          </div>
        </div>
        <div class="topic">
          <img
            :src="avatarUrl"
            alt=""
          >
          <p class="words">{{item.msg}}
          <p
            class="promotion"
            v-if="item.promotionUrl"
          >
            <a :href="item.promotionUrl.url">
              <img
                :src="item.promotionUrl.coverUrl"
                alt=""
              >
              <span>{{item.promotionUrl.title}}</span>
            </a>
          </p>
          </p>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>
<script>
import { ref, onMounted, watch, computed } from "vue";
import { useStore } from "vuex";
import { ArrowLeftBold } from "@element-plus/icons-vue";
import { getContent } from "../../api/message";
export default {
  components: {
    ArrowLeftBold,
  },
  props: {
    uid: {
      type: String,
      default: () => "",
    },
    msgShow: {
      type: String,
      default: () => "",
    },
  },
  setup(props, ctx) {
    const msgList = ref([]);
    const store = useStore();
    const back = () => {
      ctx.emit("words", "消息");
    };
    const nickname = computed(() => {
      return store.state.utils.currentMsg.fromUser.nickname;
    });
    const msg = computed(() => {
      return store.state.utils.currentMsg.msg;
    });
    const avatarUrl = computed(() => {
      return store.state.utils.currentMsg.fromUser.avatarUrl;
    });
    const promotion = ref([]);

    const get = () => {
      getContent({ uid: store.state.utils.currentMsg.user.fromUserId }).then(
        (res) => {
          console.log("私信内容", props.uid);
          for (let i = 0; i < res.msgs.length; i++) {
            promotion.value[i] = JSON.parse(res.msgs[i].msg);
            promotion.value.reverse();
          }
        }
      );
    };

    onMounted(() => {
      get();
    });
    return {
      back,
      get,
      msgList,
      nickname,
      msg,
      avatarUrl,
      promotion,
    };
  },
};
</script>
<style lang="less" scoped>
.detail {
  .top {
    display: flex;
    padding: 20px;
    .back {
      cursor: pointer;
    }
    .name {
      font-size: 13px;
      font-weight: 600;
      width: 364px;
      text-align: center;
    }
  }
  .msg-list {
    margin-top: 26px;
    .msg {
      .time {
        text-align: center;
        width: 425px;
        font-size: 12px;
        span {
          padding: 3px;
          background-color: #f5f5f6;
          border-radius: 10px;
        }
      }
    }
    .topic {
      padding: 20px;
      display: flex;
      img {
        width: 35px;
        height: 35px;
        border-radius: 50%;
      }
      .words {
        margin-left: 12px;
        padding: 8px;
        font-size: 12px;
        background-color: #f5f5f6;
        border-top-right-radius: 15px;
        border-bottom-right-radius: 15px;
        border-bottom-left-radius: 15px;
        .promotion {
          padding: 8px;
          margin-top: 8px;
          background-color: #fff;
          border-radius: 6px;
          a {
            display: flex;
            align-items: center;
            color: #656666;
            img {
              width: 65px !important;
              height: 40px !important;
              border-radius: 6px !important;
              background-size: cover;
            }
          }

          &:hover {
            background-color: #e1e2e3;
          }
        }
      }
    }
  }
}
</style>
