<script setup lang="ts">
import type { DropdownOption } from 'naive-ui';
import { PageEnum } from '@/enums/pageEnum';
import { useDesignSettingStore } from '@/store/modules/designSetting';
import { useTagesViewStore, type RouteItem } from '@/store/modules/tagsView';
import { renderIcon } from '@/utils/tools';
import {
  CloseOutlined,
  ColumnWidthOutlined,
  MinusOutlined,
  ReloadOutlined,
  LeftOutlined,
  RightOutlined
} from '@vicons/antd';
import { Refresh } from '@vicons/ionicons5';
const tabsRef = ref<HTMLElement>();
const tagesViewStore = useTagesViewStore();
const settingStore = useDesignSettingStore();
const route = useRoute();
const router = useRouter();

const getThemeColor = computed(() => settingStore.appTheme);
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

const tabsList: any = computed({
  get: () => tagesViewStore.tagsViewList,
  set: (val) => {
    tagesViewStore.setTagsViewList(val);
  }
});
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

// 滚动左边位置

const scrollPre = () => {
  const containerWidth = tabsRef.value!.offsetWidth;
  const currentScroll = tabsRef.value!.scrollLeft;
  if (!currentScroll) return;
  const scrollLeft =
    currentScroll > containerWidth ? currentScroll - containerWidth : 0;

  tabsRef.value!.scrollTo({
    left: scrollLeft,
    top: 0,
    behavior: 'smooth'
  });
};

// 滚动右边位置

const scrollNext = () => {
  const containerWidth = tabsRef.value!.offsetWidth;
  const navWidth = tabsRef.value!.scrollWidth;
  const currentScroll = tabsRef.value!.scrollLeft;

  if (navWidth - currentScroll <= containerWidth) return;
  const scrollLeft =
    navWidth - currentScroll > containerWidth * 2
      ? currentScroll + containerWidth
      : navWidth - containerWidth;
  tabsRef.value!.scrollTo({
    left: scrollLeft,
    top: 0,
    behavior: 'smooth'
  });
};

// 更新tab滚动位置
const updateScorllTab = async () => {
  await nextTick();
  const containerWidth = tabsRef.value!.offsetWidth;
  const navWidth = tabsRef.value!.scrollWidth;
  if (containerWidth < navWidth) {
    const tagList = tabsRef.value!.querySelectorAll('.tag-scroll-item') || [];
    [...tagList].forEach((tag: Element) => {
      if (tag.id === `tag${state.activeKey}`) {
        tag.scrollIntoView && tag.scrollIntoView();
      }
    });
  }
};

watch(
  () => route.fullPath,
  (newVal) => {
    state.activeKey = newVal;
    tagesViewStore.addTagsView(getSimpleRoute(route));
    updateScorllTab();
  },
  {
    immediate: true
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
    icon: renderIcon(ReloadOutlined)
  },
  {
    label: '关闭当前标签页',
    key: 'closeCurrent',
    disabled: false,
    icon: renderIcon(CloseOutlined)
  },
  {
    label: '关闭其他标签页',
    key: 'closeOther',
    disabled: false,
    icon: renderIcon(ColumnWidthOutlined)
  },
  {
    label: '关闭全部标签页',
    key: 'closeAll',
    disabled: false,
    icon: renderIcon(MinusOutlined)
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
  state.showDropdown = false;
};

const clickoutside = () => {
  state.showDropdown = false;
};
</script>
<template>
  <div class="tags-contanier">
    <div class="flex overflow-hidden flex-1 h-full items-center">
      <span
        class="px-2 cursor-pointer border-r flex items-center h-full hover:bg-slate-50"
        @click="scrollPre"
      >
        <n-icon>
          <LeftOutlined />
        </n-icon>
      </span>
      <div ref="tabsRef" class="tag-scroll flex flex-1 h-full items-center">
        <VueDraggable
          v-model="tabsList"
          ghostClass="ghost"
          class="flex"
          animation="150"
        >
          <div
            :id="`tag${item.fullPath}`"
            class="tag-scroll-item"
            :class="{ 'active-item': state.activeKey === item.fullPath }"
            v-for="item in tabsList"
            :key="item.fullPath"
            @contextmenu="openMenu($event, item)"
          >
            <div
              class="h-full flex items-center px-2"
              @click="jumpTo(item.fullPath)"
            >
              {{ item.meta.title }}
            </div>
            <n-icon @click="removeTab(item.fullPath)" style="margin-right: 4px">
              <CloseOutlined />
            </n-icon>
          </div>
        </VueDraggable>
      </div>
      <span
        class="px-2 cursor-pointer border-l flex items-center h-full hover:bg-slate-50"
        @click="scrollNext"
      >
        <n-icon>
          <RightOutlined />
        </n-icon>
      </span>
    </div>
    <div class="flex justify-center items-center h-full">
      <span
        class="px-2 cursor-pointer border-l flex items-center h-full hover:bg-slate-50"
        @click="reloadPage"
      >
        <n-icon>
          <Refresh />
        </n-icon>
      </span>
    </div>
    <n-dropdown
      placement="bottom-start"
      trigger="manual"
      :show="state.showDropdown"
      :x="state.x"
      :y="state.y"
      :options="options"
      @select="handleSelect"
      @clickoutside="clickoutside"
    />
  </div>
</template>
<style lang="scss" scoped>
.tags-contanier {
  display: flex;
  align-items: center;
  height: 38px;
  padding: 2px;
  flex-shrink: 0;
  box-shadow: 0 1px 2px rgb(0 21 41 / 8%);

  .ghost {
    opacity: 0.5;
    background: #c8ebfb;
  }

  .active-item {
    background-color: v-bind(getThemeColor) !important;
    color: #fff !important;
  }

  .tag-scroll {
    flex: 1;
    overflow: hidden;
  }

  .tag-scroll-item {
    height: 100%;
    display: flex;
    align-items: center;
    cursor: pointer;
    margin: 0 6px;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    white-space: nowrap;
    transition: all 0.3s ease-in-out;
  }
}
</style>
