<template>
  <div
    class="message"
    v-show=" msgShow == '消息' "
    @words="test"
  >

    <div class="top">
      <div class="title">消息</div>
      <div class="read">一键已读</div>
    </div>
    <div class="message-tab">
      <ul>
        <li
          v-for="(item, index) in list"
          :key="item.id"
          :class="{active: activeIndex == index}"
          @click="liClick(index,item)"
        >{{item.text}}
          <!-- <span class="count">{{count}}</span> -->
        </li>

      </ul>
    </div>
    <div
      v-if=" words === '私信' "
      class="private"
    >
      <ul>
        <li
          v-for="(item, index) in privateLetter"
          :key="index"
          @click="readMsg(item)"
        >
          <div class="dian">
            <svg
              v-if="item.newMsgCount"
              class="icon"
              aria-hidden="true"
            >
              <use xlink:href="#icon-dian"></use>
            </svg>
          </div>
          <div class="left">
            <img
              :src="item.fromUser.avatarUrl"
              alt=""
            >
          </div>
          <div class="right">
            <span class="name">{{item.fromUser.nickname}}</span>
            <span class="msg">{{item.msg}}</span>
          </div>
        </li>
      </ul>
    </div>

    <div v-show=" words == '评论' ">评论</div>
    <div v-show=" words == '@我' ">@我</div>
    <div v-show=" words == '通知' ">通知</div>
  </div>
  <div
    class="detail"
    v-show=" msgShow == '详细' "
    @click="toMsg"
  >
    <detail
      :uid="uid"
      :msgShow="msgShow"
    ></detail>
  </div>
</template>
<script>
import { reactive, ref, onMounted, nextTick, computed, watch } from "vue";
import { useStore } from "vuex";
import { getMessage } from "../../api/message";
import Detail from "./detail.vue";
import { ElMessage } from "element-plus";
export default {
  components: {
    Detail,
  },
  setup(props) {
    const store = useStore();
    const list = reactive([
      { id: "001", text: "私信" },
      { id: "002", text: "评论" },
      { id: "003", text: "@我" },
      { id: "004", text: "通知" },
    ]);
    const activeIndex = ref(0);
    const liClick = (index, item) => {
      activeIndex.value = index;
      console.log(index);
      count.value -= 1;
      words.value = item.text;
    };
    const count = ref(12);
    const words = ref("私信");
    // 私信数据
    const privateLetter = ref([]);
    // 私信是否已读
    const msgSenderType = ref(1);
    const lastMsg = ref([]);
    const currentMsg = ref({});
    onMounted(() => {
      getMessage()
        .then((res) => {
          privateLetter.value = res.msgs;
          console.log("私信", res.msgs);
          for (let i = 0; i < res.msgs.length; i++) {
            let lastMsgList = JSON.parse(res.msgs[i].lastMsg);
            lastMsg.value.push(lastMsgList);
            for (let m = 0; m < lastMsg.value.length; m++) {
              Object.assign(privateLetter.value[m], lastMsg.value[m]);
            }
          }
        })
        .catch((e) => {
          if (e.response) {
            ElMessage.error(e.response.data.msg);
          }
        });
    });
    const fromUserId = ref("");
    const uid = ref("");
    const readMsg = (item) => {
      console.log(item);
      uid.value = item.fromUser.userId;
      store.commit("utils/setCurrentMsg", item);
      msgShow.value = "详细";
    };
    const toMsg = () => {
      msgShow.value = "消息";
    };
    const msgShow = ref("消息");
    const test = (words) => {
      msgShow.value = words;
    };
    const uids = computed(() => {
      return store.state.utils.currentMsg.user.fromUserId;
    });
    watch(() => uids),
      (uids) => {
        console.log(uids);
        get();
      },
      { deep: true },
      { immediate: true };
    return {
      list,
      activeIndex,
      count,
      words,
      privateLetter,
      msgSenderType,
      msgShow,
      lastMsg,
      uids,
      liClick,
      readMsg,
      toMsg,
    };
  },
};
</script>
<style lang="less" scoped>
.message {
  .top {
    padding: 20px 15px;
    display: flex;
    justify-content: space-between;
    .title {
      font-size: 20px;
    }
    .read {
      color: #0b58c1;
    }
  }
  .message-tab {
    margin: 12px auto;
    width: 80%;
    ul {
      width: 320px;
      display: flex;
      justify-content: center;
      border: 1px solid #bbbbbb;
      border-radius: 20px;
      li {
        position: relative;
        width: 80px;
        line-height: 30px;
        border-radius: 20px;
        text-align: center;
        cursor: pointer;
        .count {
          position: absolute;
          top: -16px;
          right: 0;
          background-color: red;
          color: #fff;
          font-size: 11px;
        }
      }
      .active {
        background-color: #bbbbbb;
      }
    }
  }
  .private {
    ul {
      li {
        display: flex;
        align-items: center;
        .dian,
        .icon {
          width: 20px;
          height: 20px;
          .icon {
            fill: red;
          }
        }
        .left {
          img {
            width: 30px;
            height: 30px;
            border-radius: 50%;
          }
        }
        .right {
          margin-left: 10px;
          display: flex;
          flex-flow: wrap;
          padding: 13px 0;
          border-bottom: 1px solid #e8e8e9;
          .name {
            font-size: 14px;
            color: #508fc7;
          }
          .msg {
            width: 330px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 11px;
          }
        }
        &:hover {
          background-color: #f5f5f6;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
