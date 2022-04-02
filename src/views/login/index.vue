<template>
  <div
    class="login"
    v-if="isLogin"
  >
    <div class="login-box">
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

  </div>
</template>
<script>
import { ref, reactive, computed } from "vue";
import { loginByPhone } from "../../api/login";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Cookies from "js-cookie";
export default {
  setup(props) {
    const store = useStore();
    const router = useRouter();

    // !控制登录框的显示
    const isLogin = computed(() => {
      return store.state.utils.isLogin;
    });
    const phoneForm = reactive({
      phone: "15528132178",
      password: "199697427abc",
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
    return {
      phoneForm,
      LoginRules,
      loginFormRef,
      isLogin,
      login,
    };
  },
};
</script>
<style lang="less" scoped>
.login {
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
