<template>
  <div class="layout-header">
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
import AppBreadcrumb from './AppBreadcrumb.vue';
</script>
<style lang="scss">
.layout-header {
  width: 100%;
  height: 64px;
  flex-shrink: 0;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
  transition: all 0.2s ease-in-out;
  z-index: 999;
}
</style>
