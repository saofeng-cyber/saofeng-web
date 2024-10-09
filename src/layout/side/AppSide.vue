<template>
  <n-layout-sider v-if="device" class="layout-sider" :collapsed="collapsed" collapse-mode="width" :collapsed-width="64"
    :width="sideWidth" show-trigger :native-scrollbar="false" @update:collapsed="onUpdateCollapsed">
    <Logo :isCollapsed="collapsed" />
    <AppMenu :collapsed="collapsed" />
  </n-layout-sider>
  <n-drawer v-else v-model:show="collapsed" :trap-focus="false" placement="left" :native-scrollbar="false">
    <Logo />
    <AppMenu />
  </n-drawer>
</template>

<script lang="ts" setup>
import AppMenu from './menu/AppMenu.vue';
import Logo from '@/components/Logo.vue';
import { useDesignSettingStore } from '@/store/modules/designSetting';
const designSettingStore = useDesignSettingStore();
const { collapsed, sideWidth, device, deviceWidth } = storeToRefs(designSettingStore);
const onUpdateCollapsed = () => {
  designSettingStore.setCollapsed(!collapsed.value);
};
useResizeObserver(document.body, (entries) => {
  const entry = entries[0];
  const { width } = entry.contentRect;
  if (width > 0 && width < deviceWidth.value) {
    designSettingStore.setDevice(false);
  } else {
    designSettingStore.setDevice(true);
  }
});
</script>
<style lang="scss">
.layout-sider {
  min-height: 100vh;
  box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
  position: relative;
  z-index: 13;
  transition: all 0.2s ease-in-out;
}
</style>
