<template>
  <div
    class="flex items-center h-full px-4 cursor-pointer hover:bg-slate-50"
    @click="changeCollapsed"
  >
    <SvgIcon :name="isCollapsed ? 'fold' : 'expand'" :width="20" :height="20" />
  </div>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store/modules/app';

const useApp = useAppStore();
const isCollapsed = computed(() => useApp.collapsed);
const changeCollapsed = () => {
  useApp.setCollapsed(!isCollapsed.value);
};
</script>
<style lang="scss" scoped></style>
