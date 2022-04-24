<template>
  <div class="dicuss-list-haha">
    <ul>
      <li
        v-for="item in comments"
        :key="item.commentId"
      >
        <img
          :src="item.user.avatarUrl"
          alt=""
        >
        <div class="info">
          <div class="name"><span style="color: #507daf">{{item.user.nickname}}</span> <span class="content">{{item.content}}</span></div>
          <div
            class="replay"
            v-for="items in item.beReplied"
            v-if="item.beReplied"
          ><span
              style="color: #507daf;  cursor: pointer"
              @click="toUserSpaec(item)"
            >@{{items.user.nickname}}</span>:{{items.content}}</div>
          <div class="date">{{item.timeStr}}</div>
        </div>
        <div class="cto">
          <el-icon @click="reply(item)">
            <chat-line-round />
          </el-icon>
        </div>
      </li>
    </ul>
    <!-- 写评论按钮 -->
    <div class="write-dicuss">
      <div
        class="write-btn"
        v-show="show"
      >
        <el-button
          type="danger"
          round
          @click="writeDicuss"
        >
          <el-icon>
            <chat-square />
          </el-icon>
          写评论
        </el-button>
      </div>
      <div v-show="!show">
        <el-backtop
          visibility-height='100'
          :right="620"
          :bottom="80"
        />
      </div>
    </div>

    <div
      class="mine"
      v-show="!show"
    >
      <el-button
        round
        size="large"
        @click="writeDicuss"
      >发表我的音乐评论</el-button>
    </div>
    <!-- 评论弹出框 -->
    <el-dialog
      v-model="dialogFormVisible"
      :title="title"
      width="500px"
      top="35vh"
      @close="dialogClose"
    >
      <el-form :model="form">
        <el-form-item>
          <el-input
            :placeholder="user"
            type="textarea"
            @input="input"
            v-model="from.text"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button
            type="danger"
            :disabled="disabled"
            @click="dicuss"
          >评论</el-button>
        </span>
      </template>
    </el-dialog>

  </div>
</template>
<script>
import { ChatLineRound, ChatSquare } from "@element-plus/icons-vue";
import { ref, reactive, onMounted, computed } from "vue";
import { sendMessage } from "../api/main";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { getSongDiscuss } from "../api/main";
import { newComment } from "../api/songs";
export default {
  props: {
    comments: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    ChatLineRound,
    ChatSquare,
  },
  setup(props) {
    const store = useStore();
    const router = useRouter();
    const user = ref();
    const dialogFormVisible = ref(false);
    const disabled = ref("true");
    const from = reactive({
      text: "",
    });
    const title = ref();
    const commentIds = ref("");
    // !点击图标
    const reply = (item) => {
      console.log("huifu", item.user.userId);
      title.value = "评论";
      dialogFormVisible.value = true;
      user.value = `回复 ${item.user.nickname}`;
      commentIds.value = item.commentId;
      t.value = 2;
    };
    const t = ref();
    // !发表回复
    const dicuss = () => {
      sendMessage({
        id: store.state.music.songInfo.songId,
        t: t.value,
        type: "0",
        content: from.text,
        commentId: commentIds.value,
      }).then((res) => {
        console.log(res);
      });
      // !延迟获取歌曲评论

      // getSongDiscuss({ id: store.state.music.songInfo.songId }).then(
      //   (res) => {
      //     console.log("歌曲评论", res);
      //     props.comments = res.comments;
      //   }
      // );
      newComment({ id: store.state.music.songInfo.songId }).then((res) => {
        console.log("歌曲评论", res);
        props.comments = res.comments;
      });

      dialogFormVisible.value = false;
    };

    const input = () => {
      if (from.text) {
        disabled.value = false;
      }
    };
    // !回复框关闭时
    const dialogClose = () => {
      from.text = "";
    };
    onMounted(() => {
      window.addEventListener("scroll", test);
    });
    // !屏幕滑动的距离
    const scrollTop = ref("");
    // ! 控制写评论button的显示
    const show = ref(true);
    const test = () => {
      // console.log(window.pageYOffset, "window.pageYOffset");
      scrollTop.value = window.pageYOffset;
      show.value = scrollTop.value >= 100 ? false : true;
    };
    const writeDicuss = () => {
      dialogFormVisible.value = true;
      user.value = "发表评论";
      title.value = "歌曲:" + store.state.music.songInfo.songName;
      t.value = 1;
    };
    // !查看个人信息
    const toUserSpaec = (item) => {
      store.commit("utils/setShow", false);
      router.push({
        path: "/main/userinfo",
        query: { uid: item.user.userId },
      });
      store.commit("utils/setIsMine", false);
    };
    return {
      dialogFormVisible,
      user,
      from,
      disabled,
      commentIds,
      scrollTop,
      show,
      title,
      t,
      reply,
      input,
      dialogClose,
      dicuss,
      test,
      writeDicuss,
      toUserSpaec,
    };
  },
};
</script>
<style lang="less" scoped>
.dicuss-list-haha {
  display: flex;
  justify-content: space-around;
  align-items: center;

  ul {
    width: 100%;
    li {
      display: flex;
      flex: 1;
      border-bottom: 1px solid #e2e2e2;
      padding: 20px 0;
      font-size: 12px;
      img {
        width: 35px;
        height: 35px;
        border-radius: 50%;
      }
    }
    .info {
      flex: 8;
      display: flex;
      flex-flow: column;
      justify-content: center;
      margin-left: 8px;
      .date {
        margin-top: 5px;
      }
      .name {
        width: 672px;
        white-space: pre-wrap;
      }
      .replay {
        background-color: #e9e9e9ea;
        border-radius: 5px;
        margin: 5px 0;
        padding: 10px 5px;
      }
    }
    .cto {
      flex: 1;
      .el-icon {
        cursor: pointer;
      }
    }
  }
  .write-dicuss {
    position: absolute;
    bottom: 80px;
    left: 73%;
  }
  .mine {
    position: fixed;
    bottom: 80px;
  }
}
</style>
