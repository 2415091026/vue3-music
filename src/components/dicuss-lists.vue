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
          ><span style="color: #507daf">@{{items.user.nickname}}</span>:{{items.content}}</div>
          <div class="date">{{item.timeStr}}</div>
        </div>
        <div class="cto">
          <el-icon @click="reply(item)">
            <chat-line-round />
          </el-icon>
        </div>
      </li>
    </ul>
    <el-dialog
      v-model="dialogFormVisible"
      title="评论"
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
import { ChatLineRound } from "@element-plus/icons-vue";
import { ref, reactive, onMounted } from "vue";
import { sendMessage } from "../api/main";
import { useStore } from "vuex";
import { getSongDiscuss } from "../api/main";
export default {
  props: {
    comments: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    ChatLineRound,
  },
  setup(props) {
    const store = useStore();
    const user = ref();
    const dialogFormVisible = ref(false);
    const disabled = ref("true");
    const from = reactive({
      text: "",
    });
    const commentIds = ref("");
    // !点击图标
    const reply = (item) => {
      console.log("huifu", item.commentId);
      dialogFormVisible.value = true;
      user.value = `回复 ${item.user.nickname}`;
      commentIds.value = item.commentId;
    };
    // !发表回复
    const dicuss = () => {
      sendMessage({
        id: store.state.music.songInfo.songId,
        t: "2",
        type: "0",
        content: from.text,
        commentId: commentIds.value,
      }).then((res) => {
        console.log(res);
      });
      const timer = setTimeout(() => {
        getSongDiscuss({ id: store.state.music.songInfo.songId }).then(
          (res) => {
            console.log("歌曲评论", res);
          }
        );
        if (timer) clearTimeout(timer);
      }, 1000);
      dialogFormVisible.value = false;
    };
    const input = () => {
      if (from.text) {
        disabled.value = false;
      }
    };
    const dialogClose = () => {
      from.text = "";
    };
    return {
      dialogFormVisible,
      user,
      from,
      disabled,
      commentIds,
      reply,
      input,
      dialogClose,
      dicuss,
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
}
</style>
