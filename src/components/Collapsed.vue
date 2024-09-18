<template>
  <div class="flex items-center h-full px-4 cursor-pointer hover:bg-slate-50" @click="changeCollapsed">
    <SvgIcon :name="isCollapsed ? 'fold' : 'expand'" :width="20" :height="20" />
  </div>
</template>

<script lang="ts" setup>
import { useDesignSettingStore } from '@/store/modules/designSetting';

const designSettingStore = useDesignSettingStore();
const isCollapsed = computed(() => designSettingStore.collapsed);
const changeCollapsed = () => {
  designSettingStore.setCollapsed(!isCollapsed.value);
};
</script>
<style lang="scss" scoped></style>
