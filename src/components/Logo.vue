<script setup lang="ts">
defineProps({
  isCollapsed: {
    type: Boolean,
    default: false
  }
});
</script>

<template>
  <div class="p-4 logo">
    <router-link to="/">
      <img src="@/assets/logo.jpg" alt="" srcset="" />
      <h1 v-if="!isCollapsed">Saofeng Admin</h1>
    </router-link>
  </div>
</template>
<style lang="scss" scoped>
.logo {
  display: flex;
  width: 100%;
  height: 64px;
  line-height: 64px;
  white-space: nowrap;
  align-items: center;
  justify-content: center;

  img {
    display: inline-block;
    height: 32px;
    border-radius: 50%;
  }

  h1 {
    display: inline-block;
    margin: 0 0 0 12px;
    font-weight: 600;
    font-size: 18px;
    line-height: 32px;
    vertical-align: middle;
  }
}
</style>
