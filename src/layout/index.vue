<template>
  <n-layout class="layout" has-sider position="absolute">
    <AppSide />
    <div class="layout-content">
      <AppHeader style="flex-shrink: 0" />
      <AppTag style="flex-shrink: 0" />
      <AppMain style="flex: 1" />
    </div>
  </n-layout>
</template>
<script lang="ts" setup>
import AppSide from './side/AppSide.vue';
import AppTag from './tags/AppTag.vue';
import AppHeader from './header/AppHeader.vue';
import AppMain from './content/AppMain.vue';
</script>
<style lang="scss" scoped>
.layout-content {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
</style>
