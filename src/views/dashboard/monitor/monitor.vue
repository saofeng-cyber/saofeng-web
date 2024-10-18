<script setup lang="ts"></script>
<template>
  <div class="relative monitor">
    <n-space>
      <n-button v-hasperm="['admin']" type="primary">admin权限</n-button>
      <n-button v-hasRole="['admin']">user权限</n-button>
    </n-space>
    <DataUi />
  </div>
</template>
<style lang="scss" scoped>
.monitor {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
