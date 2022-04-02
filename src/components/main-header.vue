<template>
  <div class="main-header">
    <!-- logo区域 -->
    <div class="logo">
      <svg
        class="icon"
        aria-hidden="true"
      >
        <use xlink:href="#icon-wangyiyunyinle"></use>
      </svg>
    </div>
    <!-- 搜索区域 -->
    <div class="search">
      <!-- 左右两个按钮 -->
      <el-button
        circle
        @click="back"
      >
        <el-icon>
          <arrow-left />
        </el-icon>
      </el-button>
      <el-button circle>
        <el-icon>
          <arrow-right />
        </el-icon>
      </el-button>
      <!-- 搜索框 -->

      <el-input
        class="w-50 m-2"
        :placeholder="placeholder"
        v-model="keyWords"
        @input="keyordsInput"
        @focus="inputFocus"
        @blur="inputBlur"
      >
        <template #prefix>
          <el-icon class="el-input__icon">
            <search />
          </el-icon>
        </template>
      </el-input>
    </div>
    <!-- 用户设置区域 -->
    <div class="userSetting">
      <div class="userSetting-left">
        <!-- 头像 -->
        <el-avatar :src="avatarUrl" />
        <!-- 用户名 -->
        <el-dropdown>
          <span
            class="user-name"
            v-if="token"
          >{{nickName}}</span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>Action 1</el-dropdown-item>
              <el-dropdown-item>Action 2</el-dropdown-item>
              <el-dropdown-item>Action 3</el-dropdown-item>
              <el-dropdown-item disabled>Action 4</el-dropdown-item>
              <el-dropdown-item divided>Action 5</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

        <span
          class="plaeseLogin"
          @click="toLogin"
          v-if="!token"
        >请登录</span>
        <!-- 信息 -->
        <el-button circle>
          <el-icon>
            <files />
          </el-icon>
        </el-button>
      </div>
      <div class="userSetting-right">111</div>
    </div>

  </div>
</template>
<script>
import { ArrowLeft, ArrowRight, Search, Files } from "@element-plus/icons-vue";
import { computed, ref, onMounted, nextTick } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { getDefaultSearch, searchSuggest } from "../api/search";
export default {
  components: {
    ArrowLeft,
    ArrowRight,
    Search,
    Files,
  },
  setup(props) {
    const router = useRouter();
    const store = useStore();
    const toLogin = () => {
      console.log("登录");
      store.commit("utils/setLoginStatus", true);
    };
    const avatarUrl = computed(() => {
      return store.state.user.avatarUrl;
    });
    const token = computed(() => {
      return localStorage.getItem("token");
    });
    const nickName = computed(() => {
      return store.state.user.nickname;
    });
    const back = () => {
      router.go(-1);
    };
    const keyWords = ref();
    const keyordsInput = () => {
      console.log(keyWords.value);
      store.commit("utils/setKeyWords", keyWords.value);

      const timer = setTimeout(() => {
        searchSuggest({ keywords: keyWords.value }).then((res) => {
          console.log("搜索建议", res);
          if (res.result) {
            store.commit("search/setSearchSuggest", res.result);
          }
          if (!timer) clearTimeout(timer);
        });
      }, 500);
    };
    // !搜索框获取焦点
    const inputFocus = () => {
      // console.log("获取了焦点");
      store.commit("utils/setSearchShow", true);
    };
    // !搜索框失去了焦点
    const inputBlur = () => {
      // console.log("失去了焦点");
      const timer = setTimeout(() => {
        store.commit("utils/setSearchShow", false);
        if (!timer) clearTimeout(timer);
      }, 500);
      // store.commit("utils/setKeyWords", "");
    };
    const placeholder = ref("");
    onMounted(() => {
      // !获取搜索默认关键词
      getDefaultSearch().then((res) => {
        console.log("默认", res);
        placeholder.value = res.data.showKeyword;
      });
    });

    return {
      toLogin,
      back,
      avatarUrl,
      token,
      nickName,
      keyWords,
      placeholder,
      keyordsInput,
      inputFocus,
      inputBlur,
    };
  },
};
</script>
<style lang="less" scoped>
.main-header {
  display: flex;
  align-items: center;
  width: 100%;
  height: 60px;
  background-color: #ec4141;
  .logo {
    flex: 1;
    display: flex;
    justify-content: center;
    .icon {
      width: 150px;
      height: 60px;
      fill: #fff;
      // height: 10rem;
    }
  }
  .search {
    flex: 7;
    width: 100%;
  }
  .userSetting {
    flex: 2;
  }
  .userSetting {
    display: flex;
    height: 60px;
    line-height: 60px;
    align-items: center;
    .userSetting-left {
      flex: 1;
      display: flex;
      justify-content: space-around;
      align-items: center;

      .el-button {
        background-color: #ec4141 !important;
        border-color: #ec4141 !important;
      }
      .user-name,
      .plaeseLogin {
        color: #fbd9d9;
        cursor: pointer;
      }
    }
    .userSetting-right {
      flex: 1;
    }
  }
}
.search {
  .el-button {
    background-color: #d93b3b !important;
    border-color: #d93b3b !important;
  }
}

.el-input {
  width: 10% !important;
  margin-left: 12px;
  border: 0 !important;
  --el-input-border-color: none;
  --el-input-placeholder-color: #f09e9e;
  --el-input-hover-border-color: none;
  --el-input-focus-border-color: none;
  --el-input-icon-color: #fff;
}
.el-input /deep/ .el-input__inner {
  border-radius: 27px;
  background-color: #e13e3e !important;
  border: 0 !important;
}
.el-icon:hover {
  color: #fff !important;
}
.el-icon {
  color: #fbd9d9 !important;
}
</style>
