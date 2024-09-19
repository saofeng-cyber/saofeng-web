<script setup lang="ts">
import type { DropdownOption } from 'naive-ui';
import { PageEnum } from '@/enums/pageEnum';
import { useDesignSettingStore } from '@/store/modules/designSetting';
import { useTagesViewStore, type RouteItem } from '@/store/modules/tagsView';
import { renderIcon } from '@/utils/tools';
import { CloseOutlined, ColumnWidthOutlined, MinusOutlined, ReloadOutlined } from '@vicons/antd';
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
  vistedKey: '',
  query: {},
  showDropdown: false,
  x: 0,
  y: 0
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
      updateTagsView();
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
      updateTagsView();
    });
  }
);

const openMenu = (e: MouseEvent, item: RouteItem) => {
  options.value[0].disabled = item.fullPath !== state.activeKey;
  options.value[1].disabled = item.meta.affix ?? false;
  options.value[2].disabled = tabsList.value.length === 1;
  options.value[3].disabled = tabsList.value.length === 1;
  state.vistedKey = item.fullPath;
  state.query = item.query;
  e.preventDefault();
  state.showDropdown = false;
  nextTick(() => {
    state.showDropdown = true;
    state.x = e.clientX;
    state.y = e.clientY;
  });
};

const options = ref<DropdownOption[]>([
  {
    label: '刷新当前标签页',
    key: 'refresh',
    disabled: false,
    icon: renderIcon(ReloadOutlined),
  },
  {
    label: '关闭当前标签页',
    key: 'closeCurrent',
    disabled: false,
    icon: renderIcon(CloseOutlined),
  },
  {
    label: '关闭其他标签页',
    key: 'closeOther',
    disabled: false,
    icon: renderIcon(ColumnWidthOutlined),
  },
  {
    label: '关闭全部标签页',
    key: 'closeAll',
    disabled: false,
    icon: renderIcon(MinusOutlined),
  }
]);

// 刷新页面
const reloadPage = () => {
  router.go(0);
};

// 关闭其他标签页
const closeOtherTagsView = () => {
  tagesViewStore.closeOtherTagsView(state.activeKey);
  router.push(state.activeKey);
};

// 关闭所有标签页
const closeAllTagsView = () => {
  tagesViewStore.closeAllTagsView();
  router.replace(PageEnum.BASE_HOME);
};

const handleSelect = (key: string) => {
  switch (key) {
    case 'refresh':
      reloadPage();
      break;
    case 'closeCurrent':
      removeTab(route.fullPath);
      break;
    case 'closeOther':
      closeOtherTagsView();
      break;
    case 'closeAll':
      closeAllTagsView();
      break;
  }
  nextTick(() => {
    updateTagsView();
  });
};

const updateTagsView = () => {
  tabsRef.value?.syncBarPosition();
  state.showDropdown = false;
}

const clickoutside = () => {
  updateTagsView();
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
    <div class="">
      <n-button circle text @click="reloadPage">
        <n-icon size="20">
          <ReloadOutlined />
        </n-icon>
      </n-button>
    </div>
    <n-dropdown placement="bottom-start" trigger="manual" :show="state.showDropdown" :x="state.x" :y="state.y"
      :options="options" @select="handleSelect" @clickoutside="clickoutside" />
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
  flex: 1;
  --n-pane-padding-top: 0;
}
</style>
