import { defineStore } from 'pinia';
import designSetting from '@/settings/designSetting';
export const useDesignSettingStore = defineStore(
  'app-design-setting',
  () => {
    const collapsed = ref(true); // 是否折叠侧边栏
    const device = ref(true); // 是否是移动端
    const deviceWidth = ref(952); // 设备宽度
    const sideWidth = ref(220); // 侧边栏宽度
    const darkTheme = ref(designSetting.darkTheme);
    const appTheme = ref(designSetting.appTheme);
    const appThemeList = ref(designSetting.appThemeList);
    const tabOptions = ref(designSetting.tabOptions);
    const tabActive = ref('card');

    const setDevice = (flag: boolean) => {
      device.value = flag;
    };

    const setDeviceWidth = (width: number) => {
      deviceWidth.value = width;
    };

    const setCollapsed = (flag: boolean) => {
      collapsed.value = flag;
    };

    const setSideWidth = (width: number) => {
      sideWidth.value = width;
    };

    const setTabActive = (active: string) => {
      tabActive.value = active;
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
      tabActive.value = 'card';
    };
    return {
      device,
      setDevice,
      deviceWidth,
      setDeviceWidth,
      collapsed,
      setCollapsed,
      sideWidth,
      setSideWidth,
      darkTheme,
      appTheme,
      appThemeList,
      setTheme,
      setDarkTheme,
      resetTheme,
      tabOptions,
      tabActive,
      setTabActive
    };
  },
  {
    persistedState: {
      key: 'app-design-setting',
      persist: true
    }
  }
);
