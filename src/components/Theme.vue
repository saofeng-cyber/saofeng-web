<script setup lang="ts">
import { useUserStore } from '@/store/modules/user';


const userStore = useUserStore()
const loginOut = () => {
  console.log('loginOut')
  userStore.userLoginout();
  location.reload()
}
</script>

<template>
  <div class="px-4 cursor-pointer" @click="loginOut">
    <SvgIcon name="sun" :width="18" :height="18" />
  </div>
</template>
