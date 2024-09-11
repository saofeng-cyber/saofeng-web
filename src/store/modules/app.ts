export const useAppStore = defineStore(
  'app',
  () => {
    // state
    const sideWidth = ref(200);
    const collapsed = ref(true);
    const token = ref('');
    // actions
    const setSideWidth = (width: number) => {
      sideWidth.value = width;
    };
    const setCollapsed = (flag: boolean) => {
      collapsed.value = flag;
    };
    const setToken = (_token: string) => {
      token.value = _token;
    };
    return {
      sideWidth,
      setSideWidth,
      collapsed,
      setCollapsed,
      token,
      setToken
    };
  },
  {
    persistedState: {
      key: 'app',
      persist: true
    }
  }
);
