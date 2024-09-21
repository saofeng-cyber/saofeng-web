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

    const setTagsViewList = (list: RouteItem[]) => {
      tagsViewList.value = list;
    }
    const addTagsView = (view: RouteItem) => {
      const isExists = tagsViewList.value.some(
        (item) => item.fullPath == view.fullPath
      );
      if (!isExists) {
        tagsViewList.value.push(view);
      }
      return true;
    };
    const removeTagsView = (fullPath: string) => {
      const index = tagsViewList.value.findIndex(
        (item) => item.fullPath == fullPath
      );
      if (index > -1) {
        tagsViewList.value.splice(index, 1);
      }
    };
    const closeOtherTagsView = (fullPath: string) => {
      tagsViewList.value = tagsViewList.value.filter(
        (item) => item.fullPath == fullPath || item.meta.affix
      );
    };

    const closeAllTagsView = () => {
      tagsViewList.value = tagsViewList.value.filter((item) => item.meta.affix);
    };
    return {
      tagsViewList,
      visitedViews,
      setTagsViewList,
      addTagsView,
      removeTagsView,
      closeOtherTagsView,
      closeAllTagsView
    };
  },
  {
    persistedState: {
      persist: true
    }
  }
);
