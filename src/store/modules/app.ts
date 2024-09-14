export const useAppStore = defineStore(
  'app',
  () => {
    // state
    const sideWidth = ref(220);
    const collapsed = ref(true);
    // actions

    const setSideWidth = (width: number) => {
      sideWidth.value = width;
    };
    const setCollapsed = (flag: boolean) => {
      collapsed.value = flag;
    };
    return {
      sideWidth,
      setSideWidth,
      collapsed,
      setCollapsed
    };
  },
  {
    persistedState: {
      key: 'app',
      persist: true
    }
  }
);
