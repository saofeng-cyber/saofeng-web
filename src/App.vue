<script setup lang="ts">
import type { GlobalTheme } from 'naive-ui';
import { darkTheme } from 'naive-ui';
const settingStore = useDesignSettingStore();
const theme = computed((): GlobalTheme | null => settingStore.darkTheme ? darkTheme : null);
import { lighten } from './utils';
import { useDesignSettingStore } from './store/modules/designSetting';
/**
 * @type import('naive-ui').GlobalThemeOverrides
 */
const getThemeOverrides = computed(() => {
  const appTheme = settingStore.appTheme;
  const lightenStr = lighten(settingStore.appTheme, 6);
  return {
    common: {
      primaryColor: appTheme,
      primaryColorHover: lightenStr,
      primaryColorPressed: lightenStr,
      primaryColorSuppl: appTheme,
    },
    LoadingBar: {
      colorLoading: appTheme,
    },
  };
});
</script>

<template>
  <n-config-provider :theme="theme" :theme-overrides="getThemeOverrides" preflight-style-disabled>
    <RouterView />
  </n-config-provider>
</template>
