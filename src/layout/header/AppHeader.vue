<template>
  <div class="layout-header" :style="headerStyle">
    <div class="flex items-center justify-between w-full h-full">
      <div class="flex items-center flex-1 h-full">
        <Collapsed />
        <AppBreadcrumb />
      </div>
      <div class="flex items-center h-full">
        <Theme />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store/modules/app';
import AppBreadcrumb from './AppBreadcrumb.vue';
const useApp = useAppStore();
const { collapsed, sideWidth } = storeToRefs(useApp);
const headerStyle = computed(() => {
  return {
    width: collapsed.value ? 'calc(100% - 64px)' : `calc(100% - ${sideWidth.value}px)`
  };
});
</script>
<style lang="scss">
.layout-header {
  position: fixed;
  top: 0;
  right: 0;
  height: 64px;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  transition: all 0.2s ease-in-out;
  background-color: #fff;
  z-index: 999;
}
</style>
