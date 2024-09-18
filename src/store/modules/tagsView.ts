export interface RouteItem {
  fullPath: string;
  path: string;
  name: string;
  hash: string;
  params: object;
  meta: {
    title: string;
    icon: string;
    affix: boolean;
  };
  query: object;
}
export const useTagesViewStore = defineStore(
  'tagsView',
  () => {
    // state
    const tagsViewList = ref<RouteItem[]>([]);
    const visitedViews = ref([]);
    // actions
    const addTagsView = (view: RouteItem) => {
      const isExists = tagsViewList.value.some(
        (item) => item.fullPath == view.fullPath
      );
      if (!isExists) {
        tagsViewList.value.push(view);
      }
      return true;
    };
    const removeTagsView = (view: RouteItem) => {
      const index = tagsViewList.value.findIndex(
        (item) => item.fullPath == view.fullPath
      );
      if (index > -1) {
        tagsViewList.value.splice(index, 1);
      }
    };
    return {
      tagsViewList,
      visitedViews,
      addTagsView,
      removeTagsView
    };
  },
  {
    persistedState: {
      persist: true
    }
  }
);
