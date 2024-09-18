import { defineStore } from 'pinia';
import designSetting from '@/settings/designSetting';
export const useDesignSettingStore = defineStore(
  'app-design-setting',
  () => {
    const collapsed = ref(true);
    const sideWidth = ref(220); // 侧边栏宽度
    const darkTheme = ref(designSetting.darkTheme);
    const appTheme = ref(designSetting.appTheme);
    const appThemeList = ref(designSetting.appThemeList);

    const setCollapsed = (flag: boolean) => {
      collapsed.value = flag;
    };

    const setSideWidth = (width: number) => {
      sideWidth.value = width;
    };
    // 设置主题
    const setTheme = (theme: string) => {
      appTheme.value = theme;
    };
    // 设置暗黑模式
    const setDarkTheme = (dark: boolean) => {
      darkTheme.value = dark;
    };
    const resetTheme = () => {
      darkTheme.value = designSetting.darkTheme;
      appTheme.value = designSetting.appTheme;
    };
    return {
      collapsed,
      setCollapsed,
      sideWidth,
      setSideWidth,
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
