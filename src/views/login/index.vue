<template>
  <div
    class="login"
    v-if="isLogin"
  >
    <div
      class="login-box"
      v-if="!img"
    >
      <div class="login-title">登录</div>
      <!-- 登录的表单验证 -->
      <div class="login-form">
        <el-form
          class="demo-ruleForm"
          :model="phoneForm"
          :rules="LoginRules"
          ref="loginFormRef"
        >
          <el-form-item prop="phone">
            <div class="input-out">
              <el-input
                placeholder="请输入手机号"
                v-model="phoneForm.phone"
              />
            </div>

          </el-form-item>
          <el-form-item prop="password">
            <div class="input-out">
              <el-input
                placeholder="请输入密码"
                v-model="phoneForm.password"
                type="password"
              />
            </div>

          </el-form-item>
        </el-form>
      </div>
      <!-- 登录按钮 -->
      <div class="login-btn">
        <el-button
          type="danger"
          @click="login"
        >登录</el-button>
      </div>
      <!-- 提示 -->
      <div class="desc">
        <span>还没账号,去<span class="link">注册</span></span>
      </div>
    </div>
    <div class="test">
      <div class="ercode">
        <svg
          class="icon"
          aria-hidden="true"
          v-if="!img"
          @click="useErWeiMaLogin"
        >
          <use xlink:href="#icon-erweima"></use>
        </svg>
        <svg
          class="icon"
          aria-hidden="true"
          v-if="img"
          @click="usePasswordLogin"
        >
          <use xlink:href="#icon-diannao"></use>
        </svg>
      </div>
      <div class="descs">{{words}}</div>
    </div>
    <div
      class="erweima"
      v-if="img"
    ><img
        :src="img"
        alt=""
        v-if="!isSao"
      >
      <img
        src="../../assets/styles/erweima.png"
        alt=""
        v-if="isSao"
      >
      <h4>{{QrWords}}</h4>
      <div
        class="past"
        v-if="isErWeiMaDescShow"
      >
        <p>二维码过期啦</p>
        <el-button
          type="danger"
          @click="refresh"
        >刷新</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, reactive, computed, nextTick, watch } from "vue";
import { loginByPhone, getKey, creatQr, check } from "../../api/login";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Cookies from "js-cookie";
import { FIRST_LAST_KEYS } from "element-plus/lib/components";
import { userInfo } from "os";
export default {
  setup(props) {
    const store = useStore();
    const router = useRouter();

    // !控制登录框的显示
    const isLogin = computed(() => {
      return store.state.utils.isLogin;
    });
    const phoneForm = reactive({
      phone: "",
      password: "",
    });
    const LoginRules = reactive({
      phone: [
        {
          required: true,
          message: "手机号不能为空",
          trigger: "blur",
        },
        {
          pattern: /^[1][3,4,5,6,7,8,9][0-9]{9}$/,
          message: "手机格式不正确",
        },
      ],
      password: [
        {
          required: true,
          message: "请输入你的密码",
          trigger: "blur",
        },
        { min: 6, max: 15, message: "密码长度在6-15位", trigger: "blur" },
      ],
    });
    const loginFormRef = ref(null);
    const login = () => {
      loginFormRef.value.validate((valid) => {
        if (valid) {
          loginByPhone({
            phone: phoneForm.phone,
            password: phoneForm.password,
          }).then((res) => {
            console.log(res.cookie);
            // !设置cookie
            // const { cookie } = res;
            Cookies.set("userCookie", res.cookie);
            // !将用户信息保存到vuex中
            const { avatarUrl, birthday, nickname, userId } = res.profile;
            const { token } = res;
            store.commit("user/setProfle", {
              avatarUrl,
              birthday,
              nickname,
              userId,
              token,
            });
            // !保存token
            localStorage.setItem("token", token);
            store.commit("utils/setLoginStatus", false);
            router.go(0);
          });
        }
      });
    };
    const descWords = ref("");
    const statusCode = ref("");
    const key = ref("");
    const isLogins = ref(false);
    const img = ref("");
    const words = ref("扫码登录");
    const useErWeiMaLogin = () => {
      console.log("扫码登录");
      getQrKey();
      isSao.value = false;
    };
    // 获取key
    const getQrKey = () => {
      getKey({ timerstamp: new Date().getTime() }).then((res) => {
        console.log("key", res);
        key.value = res.data.unikey;
        getQr(res.data.unikey);
        words.value = "密码登录";
      });
    };
    const usePasswordLogin = () => {
      img.value = "";
      words.value = "扫码登录";
      isLogins.value = false;
    };
    // 获取二维码图片
    const getQr = (key) => {
      creatQr({
        key: key,
        timerstamp: new Date().getTime(),
        qrimg: true,
      }).then((res) => {
        console.log("img", res);
        img.value = res.data.qrimg;
        checkCode();
        isLogins.value = true;
      });
    };
    // 检查二维码状态
    const userInfos = ref();
    const COOKIES = ref();
    const checkCode = (timerstamp) => {
      check({
        key: key.value,
        timerstamp: new Date().getTime(),
      }).then((res) => {
        console.log("状态", res);
        statusCode.value = res.code;
        descWords.value = res.message;
        userInfos.value = res;
        COOKIES.value = res.cookie;
      });
    };
    // 控制二维码过期文字提示的显示
    const isErWeiMaDescShow = ref(false);
    // 判断二维码是否被扫描
    const isSao = ref(false);
    const QrWords = ref("扫描二维码登录");
    // 刷新二维码
    const refresh = () => {
      getQrKey();
      isErWeiMaDescShow.value = false;
    };
    watch(
      () => isLogins.value,
      (val) => {
        console.log(isLogins.value);
        let timer = null;
        if (val == true) {
          timer = setInterval(async () => {
            const timerstamp = new Date().getTime();
            checkCode(timerstamp);
            let code = statusCode.value;
            if (code == 800) {
              console.log(descWords.value, isErWeiMaDescShow.value);
              isErWeiMaDescShow.value = true;
              isSao.value = false;
              getQr();
              QrWords.value = "扫描二维码登录";
            } else if (code == 802) {
              QrWords.value = "";
              isSao.value = true;
              store.commit("user/setProfle", userInfos.value);
            } else if (code == 803) {
              console.log(descWords.value);
              Cookies.set("userCookie", COOKIES, { expires: 7 });
              store.commit("utils/setLoginStatus", false);
              router.go(0);
              clearInterval(timer);
            }
          }, 1000);
        } else {
          clearInterval(timer);
        }
      }
    );

    return {
      phoneForm,
      LoginRules,
      loginFormRef,
      isLogin,
      login,
      useErWeiMaLogin,
      usePasswordLogin,
      statusCode,
      key,
      checkCode,
      isLogins,
      descWords,
      img,
      words,
      isErWeiMaDescShow,
      getQrKey,
      refresh,
      isSao,
      QrWords,
      userInfos,
      COOKIES,
    };
  },
};
</script>
<style lang="less" scoped>
.login {
  position: relative;
  width: 350px;
  height: 550px;
  box-shadow: #ec4141 0px 0px 4px;
  border-radius: 10px;
  display: flex;
  flex-flow: column;
  justify-content: center;
  overflow: hidden;
  .login-box {
    width: 100%;
    display: flex;
    flex-flow: column;
    align-items: center;
    .login-title {
      font-size: 26px;
      font-weight: 600;
      margin-top: 8rem;
    }
    .login-form {
      width: 90%;
      margin-top: 2rem;
      .input-out {
        width: 354px;
        height: 60px;
        border-radius: 6px;
        &:first-child {
          margin-bottom: 10px;
        }
      }
    }
    .login-btn {
      width: 100%;
      display: flex;
      justify-content: center;
      margin-top: 1.25rem;
      .el-button {
        width: 90%;
        height: 64px;
      }
    }
    .desc {
      margin-top: 1.275rem;
      span {
        font-weight: 600;
      }
      .link {
        color: blue;
        cursor: pointer;
      }
    }
  }
  .reg-box {
  }
  .test {
    .ercode {
      position: absolute;
      top: 0;
      right: 0;
      width: 64px;
      height: 64px;
      border-color: #ff5c00 #ff5c00 rgba(0, 0, 0, 0) rgba(0, 0, 0, 0);
      opacity: 0.4;
      border-style: solid;
      border-width: 32px;
      background-size: cover;
      transition: all 0.3s;
      cursor: pointer;
      &:hover {
        opacity: 1;
      }
      .icon {
        position: absolute;
        top: -25px;
        right: -23px;
        width: 36px;
        height: 36px;
        overflow: hidden;
        fill: #fff;
      }
    }
    &:hover .descs {
      opacity: 1;
    }
    .descs {
      position: absolute;
      top: 24px;
      right: 62px;
      background-color: #ff5c00;
      color: #fff;
      padding: 5px;
      border-radius: 5px;
      opacity: 0;
      transition: all 0.5s;
      &::after {
        content: "";
        width: 0;
        height: 0;
        border-top: 8px solid transparent;
        border-left: 8px solid #ff5c00;
        border-bottom: 8px solid transparent;
        font-size: 0;
        line-height: 0;
        position: absolute;
        right: -8px;
        top: 7px;
      }
    }
  }
  .erweima {
    position: relative;
    display: flex;
    flex-flow: column;
    align-items: center;
    .past {
      position: absolute;
      display: flex;
      flex-flow: column;
      justify-content: center;
      align-items: center;
      width: 180px;
      height: 180px;
      background-color: rgba(0, 0, 0, 0.6);
      color: #fff;
      p {
        margin-bottom: 12px;
      }
    }
  }
}
.el-input /deep/ .el-input__inner {
  height: 64px;
  background-color: #fcf2f3;
}
.el-form /deep/ .el-form-item__error {
  &:first-child {
    top: 113% !important;
  }
}
</style>
