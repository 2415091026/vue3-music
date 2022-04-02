<template>
  <div class="dicuss">
    <div class="dicuss-from">
      <el-form
        class="demo-ruleForm"
        ref="ruleFormRef"
        :rules="rules"
        :model="ruleForm"
        :show-message="false"
      >
        <el-form-item prop="text">
          <el-input
            type="textarea"
            v-model="ruleForm.text"
          />
        </el-form-item>
      </el-form>
      <el-button @click="send">评论</el-button>
    </div>
    <!-- 精彩评论 -->
    <div
      class="hot"
      v-show="hot.length"
    >
      <div class="title">
        <main-header-nav title="精彩评论"></main-header-nav>
      </div>
      <div class="words">
        <ul>
          <li
            v-for="item in hotComments"
            :key="item.commentId"
          >
            <div class="left">
              <img
                :src="item.user.avatarUrl"
                alt=""
              >
            </div>
            <div class="right">
              <div class="info">
                <span class="user">{{item.user.nickname}}:</span>
                <span class="content">{{item.content}}</span>
              </div>

              <p class="time">{{item.timeStr}}</p>
            </div>

          </li>
        </ul>
      </div>
    </div>
    <!-- 最新评论 -->
    <div
      class="new"
      ref="pinglun"
    >
      <div class="title">
        <main-header-nav title="最新评论">
          ({{commentCount}})
        </main-header-nav>

      </div>
      <div class="words">
        <ul>
          <li
            v-for="item in newComment"
            :key="item.commentId"
          >
            <div class="left">
              <img
                :src="item.user.avatarUrl"
                alt=""
              >
            </div>
            <div class="right">
              <div class="info">
                <span class="user">{{item.user.nickname}}:</span>
                <span class="content">{{item.content}}</span>
              </div>

              <p class="time">{{item.timeStr}}</p>
            </div>

          </li>
        </ul>
      </div>
    </div>
    <div class="music-pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="commentCount"
        :page-size="60"
        @current-change="currentChange"
      />
    </div>
  </div>
</template>
<script>
import { ref, reactive, nextTick, onMounted, watch, computed } from "vue";
import { ElMessage } from "element-plus";
import MainHeaderNav from "../../../components/main-header-nav";
import { getDiscuss, sendMessage } from "../../../api/main";

export default {
  components: {
    MainHeaderNav,
  },
  props: {
    hotComments: {
      type: Array,
      default: () => [],
    },
    newComments: {
      type: Array,
      default: () => [],
    },
    commentCount: {
      type: String,
      default: () => "",
    },
    id: {
      type: String,
      default: () => "",
    },
  },
  setup(props) {
    const ruleFormRef = ref();
    const ruleForm = reactive({
      text: "",
    });
    const rules = reactive({
      text: [
        { min: 1, max: 140, message: "字数在1-140", trigger: "blur" },
        {
          required: true,
          message: "Please input Activity name",
          trigger: "blur",
        },
      ],
    });
    const send = () => {
      ruleFormRef.value.validate((valid) => {
        console.log(valid);
        if (valid === false) {
          ElMessage({
            message: "写点东西吧，内容不能为空哦",
            type: "warning",
          });
        } else {
          console.log("我要发送请求了");
          console.log(ruleForm.text);
          sendMessage({
            t: "1",
            type: "2",
            content: ruleForm.text,
            id: props.id,
          }).then((res) => {
            console.log(res);
            // getDicussList();
            getDiscuss({ id: props.id, limit: limit.value, offset: "0" }).then(
              (res) => {
                console.log("新的", res);
                newComment.value = res.comments;
              }
            );
            ElMessage({
              message: "评论成功",
              type: "success",
            });
            ruleForm.text = "";
          });
        }
      });
    };
    const pageNo = ref("1");
    const currentChange = (newPage) => {
      console.log(`现在是第 ${newPage} 页`);
      pageNo.value = newPage;
      offset.value = (pageNo.value - "1") * "60";
      // console.log(pageNo - "1");
      nextTick(() => {
        getDicussList();
      });
    };
    const limit = ref("60");
    const offset = ref("");
    const pinglun = ref();
    const getDicussList = () => {
      getDiscuss({
        id: props.id,
        limit: limit.value,
        pageNo: pageNo.value,
        offset: offset.value,
      }).then((res) => {
        console.log("评论", res);
        newComment.value = res.comments;
        pinglun.value.scrollIntoView(true);
      });
    };
    // !得到最新评论的数据
    const newComment = ref([]);
    const hot = computed(() => {
      return props.hotComments;
    });
    watch(
      () => props.newComments,
      (val) => {
        newComment.value = val;
      }
    );
    return {
      ruleFormRef,
      rules,
      ruleForm,
      send,
      currentChange,
      getDicussList,
      pageNo,
      limit,
      offset,
      newComment,
      pinglun,
      hot,
    };
  },
};
</script>
<style lang="less" scoped>
.dicuss {
  .dicuss-from {
    .el-button {
      float: right;
    }
  }
  .hot,
  .new {
    .title {
      font-weight: 600;
      font-size: 14px;
    }
    .words {
      width: 100%;
      ul {
        li {
          height: 80px;

          border-bottom: 1px solid #f2f2f2;
          display: flex;
          justify-content: space-around;
          align-items: center;
          &:first-child {
            background-color: #fff;
          }
          .left {
            flex: 0.2;
            img {
              width: 35px;
              height: 35px;
              background-size: cover;
              border-radius: 50%;
            }
          }
          .right {
            display: flex;
            flex-flow: column;
            justify-content: space-between;
            flex: 9;
            span {
              font-size: 12px;
            }
            span.user {
              color: #507daf;
              cursor: pointer;
            }
            .time {
              font-size: 11px;
            }
          }
        }
      }
    }
  }
  .music-pagination {
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.el-pagination /deep/ .is-active {
  background-color: #ec4141 !important;
}
</style>
