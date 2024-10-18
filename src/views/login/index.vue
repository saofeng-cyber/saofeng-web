<script setup lang="ts">
import VuePuzzleVcode from 'vue3-puzzle-vcode';
// import type { FormInst } from 'naive-ui';
import { useUserStore } from '@/store/modules/user';

const router = useRouter();

const userStore = useUserStore();
const isShow = ref(false);
const isSuccess = ref(false);

// const formRef = ref<FormInst | null>(null);
const formValue = ref({
  username: 'admin',
  password: '123456'
});
// const rules = {
//   username: {
//     required: true,
//     message: '请输入姓名',
//     trigger: 'blur'
//   },
//   password: {
//     required: true,
//     message: '请输入密码',
//     trigger: ['blur']
//   }
// };

const onSuccess = () => {
  isShow.value = false;
  isSuccess.value = true;
};
const onClose = () => {
  isShow.value = false;
  isSuccess.value = false;
};

const handleLogin = () => {
  if (isSuccess.value) {
    userStore.userLogin(formValue.value).then(() => {
      router.push('/');
    });
  }
  isShow.value = true;
};
</script>
<template>
  <div class="login">
    <div class="login_container">
      <!-- <n-card bordered>
        <h3 class="mb-4 text-2xl text-center">登录</h3>
        <n-form
          ref="formRef"
          :label-width="80"
          :model="formValue"
          :rules="rules"
        >
          <n-form-item label="姓名" path="username">
            <n-input
              v-model:value="formValue.username"
              placeholder="输入姓名"
            />
          </n-form-item>
          <n-form-item label="密码" path="password">
            <n-input
              v-model:value="formValue.password"
              type="password"
              placeholder="输入密码"
            />
          </n-form-item>
          <n-form-item>
            <n-button type="primary" @click="handleLogin" block circle dashed
              >登录</n-button
            >
          </n-form-item>
        </n-form>
      </n-card> -->
      <h3>Login</h3>
      <input
        type="text"
        v-model="formValue.username"
        placeholder="请输入用户名"
      />
      <input
        type="password"
        v-model="formValue.password"
        placeholder="请输入密码"
      />
      <button class="logoin_btn" @click="handleLogin">Login</button>
      <VuePuzzleVcode :show="isShow" @success="onSuccess" @close="onClose" />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  position: relative;
  z-index: 1;
  // background-image: url('@/assets/images/bg1.jpg');
  // background-size: cover;
  // background-repeat: no-repeat;

  .login_container {
    width: 480px;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 32px;
    padding: 36px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    display: flex;
    flex-direction: column;

    h3 {
      font-size: 32px;
      font-weight: bold;
      text-align: center;
      color: #15253c;
    }

    .logoin_btn {
      width: 80%;
      margin: 0 auto;
      padding: 12px 0;
      background-color: #15253c;
      border: none;
      border-radius: 48px;
      font-size: 24px;
      font-weight: bold;
      color: #333;
      cursor: pointer;
      margin-top: 20px;
      color: #fff;
      box-shadow: 0 0 10px #661b0b1a;
      transition: all 0.3s ease-in-out;

      &:hover {
        background-color: #661b0b1a;
        box-shadow: 0 0 20px #661b0b1a;
      }
    }

    input {
      position: relative;
      width: 100%;
      margin-bottom: 20px;
      padding: 10px;
      border: none;
      outline: none;
      background-color: transparent;
      border-bottom: 2px solid #15253c;
      color: #15253c;
      font-size: 22px;
      font-weight: bold;

      &::placeholder {
        color: #f3f3f3;
      }
    }
  }
}
</style>
