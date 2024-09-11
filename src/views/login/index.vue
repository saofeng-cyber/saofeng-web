<script setup lang="ts">
import type { FormInst } from 'naive-ui';
import { login } from '@/api/login';
import { useAppStore } from '@/store/modules/app';

const router = useRouter();

const appStore = useAppStore();

const formRef = ref<FormInst | null>(null);
const formValue = ref({
  username: 'admin',
  password: '123456'
});
const rules = {
  username: {
    required: true,
    message: '请输入姓名',
    trigger: 'blur'
  },
  password: {
    required: true,
    message: '请输入密码',
    trigger: ['blur']
  }
};

const handleLogin = () => {
  formRef.value?.validate((errors) => {
    if (!errors) {
      login(formValue.value).then((res) => {
        const { data } = res;
        appStore.setToken(data.token);
        router.push({ path: '/' });
      });
    } else {
      console.log('验证失败');
    }
  });
};
</script>
<template>
  <div class="login">
    <div class="w-[400px] h-[300px]">
      <n-card bordered>
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
              placeholder="输入密码"
            />
          </n-form-item>
          <n-form-item>
            <n-button type="primary" @click="handleLogin" block circle dashed
              >登录</n-button
            >
          </n-form-item>
        </n-form>
      </n-card>
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
}
</style>
