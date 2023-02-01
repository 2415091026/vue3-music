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
        @change="toSearch"
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
        <el-avatar
          :src="avatarUrl"
          @click="toUserInfo"
        />
        <!-- 用户名 -->
        <el-dropdown>
          <span
            class="user-name"
            v-if="token || cookiess"
          >{{nickName}}</span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>会员中心</el-dropdown-item>
              <el-dropdown-item divided>等级</el-dropdown-item>
              <el-dropdown-item divided>个人信息设置</el-dropdown-item>
              <el-dropdown-item
                divided
                @click="out"
              >退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

        <span
          class="plaeseLogin"
          @click="toLogin"
          v-if="!token && !cookiess"
        >请登录</span>
        <!-- 信息 -->
        <div
          class="message"
          @click="catMessage"
        > <svg
            class="icon"
            aria-hidden="true"
          >
            <use xlink:href="#icon-xinxiang"></use>
          </svg></div>

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
import { logout } from "../api/login";
import Cookies from "js-cookie";
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
      // console.log("登录");
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
      // console.log(keyWords.value);
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
    const cookiess = ref("");
    onMounted(() => {
      // !获取搜索默认关键词
      getDefaultSearch().then((res) => {
        // console.log("默认", res);
        placeholder.value = res.data.showKeyword;
      });
      cookiess.value = Cookies.get("userCookie");
      // console.log("cookie", Cookies.get("MUSIC_U"));
    });
    // 当搜索框失去焦点或点击了回车键
    const toSearch = () => {
      console.log("回车");
      router.push({
        path: "/main/search",
        query: { keywords: store.state.utils.keyWords },
      });
      store.commit("utils/setSearchShow", false);
    };
    // !退出登录
    const out = () => {
      logout().then((res) => {
        // console.log(res);
        localStorage.setItem("token", "");
        store.commit("user/setProfle", {});
        Cookies.remove("userCookie");
        router.go(0);
      });
    };
    // !前往个人中心
    const toUserInfo = () => {
      store.commit("utils/setIsMine", true);
      router.push({
        path: "/main/userinfo",
        query: { uid: store.state.user.userId },
      });
    };
    // 打开私信框
    const catMessage = () => {
      // console.log("来看看你的信息");
      store.commit("utils/setMessageShow", true);
    };

    return {
      toLogin,
      back,
      avatarUrl,
      token,
      nickName,
      keyWords,
      placeholder,
      cookiess,
      keyordsInput,
      inputFocus,
      inputBlur,
      out,
      toUserInfo,
      catMessage,
      toSearch,
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
      .message {
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        .icon {
          width: 16px;
          height: 16px;
          cursor: pointer;
          fill: #fff;
        }
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
.el-avatar {
  cursor: pointer;
}
</style>
