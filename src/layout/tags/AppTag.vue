<script setup lang="ts">
import { useDesignSettingStore } from '@/store/modules/designSetting';
import { useTagesViewStore, type RouteItem } from '@/store/modules/tagsView';
const tabsRef = ref();
const tagesViewStore = useTagesViewStore();
const settingStore = useDesignSettingStore();
const route = useRoute();
const router = useRouter();
// 获取简易的路由对象
const getSimpleRoute = (route: any): RouteItem => {
  const { fullPath, hash, meta, name, params, path, query } = route;
  return { fullPath, hash, meta, name, params, path, query };
};

const state = reactive({
  activeKey: route.fullPath,
  vistedKey: ''
});
const tabsList: any = computed(() => tagesViewStore.tagsViewList);
const removeTab = (fullPath: string) => {
  if (tabsList.value.length === 1) return;
  tagesViewStore.removeTagsView(fullPath);
  // 是当前激活的标签页
  if (state.activeKey === fullPath) {
    const nextView = tabsList.value[Math.max(0, tabsList.value.length - 1)];
    router.push(nextView.fullPath);
  }
};

const jumpTo = (path: string) => {
  router.push(path);
};

watch(
  () => route.fullPath,
  (newVal) => {
    state.activeKey = newVal;
    tagesViewStore.addTagsView(getSimpleRoute(route));
    nextTick(() => {
      tabsRef.value?.syncBarPosition();
    });
  },
  {
    immediate: true,
    deep: true
  }
);

watch(
  () => settingStore.tabActive,
  () => {
    nextTick(() => {
      tabsRef.value?.syncBarPosition();
    });
  }
);

const x = ref(0);
const y = ref(0);
const showDropdownRef = ref(false);
const openMenu = (e: MouseEvent, item: RouteItem) => {
  console.log('openMenu', e, item);
  options.value[0].disabled = item.fullPath !== state.activeKey;
  options.value[1].disabled = item.meta.affix ?? false;
  options.value[2].disabled = tabsList.value.length === 1;
  options.value[3].disabled = tabsList.value.length === 1;
  state.vistedKey = item.fullPath;
  e.preventDefault();
  showDropdownRef.value = false;
  nextTick(() => {
    showDropdownRef.value = true;
    x.value = e.clientX;
    y.value = e.clientY;
  });
};

const options = ref([
  {
    label: '刷新当前标签页',
    key: 'refresh',
    disabled: false
  },
  {
    label: '关闭当前标签页',
    key: 'closeCurrent',
    disabled: false
  },
  {
    label: '关闭其他标签页',
    key: 'closeOther',
    disabled: false
  },
  {
    label: '关闭全部标签页',
    key: 'closeAll',
    disabled: false
  }
]);

const handleSelect = (key: string) => {
  switch (key) {
    case 'refresh':
      router.go(0);
      break;
    case 'closeCurrent':
      removeTab(state.activeKey);
      break;
    case 'closeOther':
      if (state.vistedKey === state.activeKey) {
        tagesViewStore.closeOtherTagsView(state.activeKey);
      } else {
        tagesViewStore.closeOtherTagsView(state.vistedKey);
        router.push(state.vistedKey);
      }
      break;
    case 'closeAll':
      tagesViewStore.closeAllTagsView();
      router.push('/');
      break;
  }
  nextTick(() => {
    tabsRef.value?.syncBarPosition();
    clickoutside();
  });
};

const clickoutside = () => {
  showDropdownRef.value = false;
};
</script>
<template>
  <div class="tags-contanier">
    <n-tabs ref="tabsRef" v-model:value="state.activeKey" tab-class="tags-views" size="small"
      :type="settingStore.tabActive" @close="removeTab" @update:value="jumpTo">
      <n-tab v-for="item in tabsList" :closable="!item.meta.affix" :key="item.fullPath" :name="item.fullPath"
        @contextmenu="openMenu($event, item)">
        <span>{{ item.meta.title }}</span>
      </n-tab>
    </n-tabs>
    <n-dropdown placement="bottom-start" trigger="manual" :show="showDropdownRef" :x="x" :y="y" :options="options"
      @select="handleSelect" @clickoutside="clickoutside" />
  </div>
</template>
<style lang="scss" scoped>
.tags-contanier {
  height: 48px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
}

.tags-views {
  --n-pane-padding-top: 0;
}
</style>
