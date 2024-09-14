import { defineStore } from 'pinia';
import designSetting from '@/settings/designSetting';
export const useDesignSettingStore = defineStore(
  'app-design-setting',
  () => {
    const darkTheme = ref(designSetting.darkTheme);
    const appTheme = ref(designSetting.appTheme);
    const appThemeList = ref(designSetting.appThemeList);
    // 设置主题
    const setTheme = (theme: string) => {
      appTheme.value = theme;
    };
    // 设置暗黑模式
    const setDarkTheme = (dark: boolean) => {
      darkTheme.value = dark;
    };
    const resetTheme = () => {
      useDesignSettingStore().$reset();
    };
    return {
      darkTheme,
      appTheme,
      appThemeList,
      setTheme,
      setDarkTheme,
      resetTheme
    };
  },
  {
    persistedState: {
      key: 'app-design-setting',
      persist: true
    }
  }
);
