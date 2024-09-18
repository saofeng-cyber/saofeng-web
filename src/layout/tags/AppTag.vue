<script setup lang="ts">
import { CloseCircleOutline } from '@vicons/ionicons5';
import { useTagesViewStore, type RouteItem } from '@/store/modules/tagsView';
const tagesViewStore = useTagesViewStore();
const route = useRoute();
const router = useRouter();
// 获取简易的路由对象
const getSimpleRoute = (route: any): RouteItem => {
  const { fullPath, hash, meta, name, params, path, query } = route;
  return { fullPath, hash, meta, name, params, path, query };
};

const state = reactive({
  activeKey: route.fullPath
});
const tabsList: any = computed(() => tagesViewStore.tagsViewList);
const removeTab = (view: RouteItem) => {
  if (tabsList.value.length === 1) {
    return;
  }
  tagesViewStore.removeTagsView(view);
  // 是当前激活的标签页
  if (state.activeKey === view.fullPath) {
    const nextView = tabsList.value[Math.max(0, tabsList.value.length - 1)];
    router.push(nextView.fullPath);
  }
};

watch(
  () => route.fullPath,
  (newVal) => {
    state.activeKey = newVal;
    tagesViewStore.addTagsView(getSimpleRoute(route));
  },
  {
    immediate: true,
    deep: true
  }
);
</script>
<template>
  <div class="tags-views" style="--n-color: #1890ff; --n-border-hover: #1890ff">
    <div
      class="tags"
      v-for="item in tabsList"
      :key="item.fullPath"
      :style="{
        color: state.activeKey === item.fullPath ? '#1890ff' : '#333333',
        border:
          state.activeKey === item.fullPath
            ? '1px solid #1890ff'
            : '1px solid #f0f0f0'
      }"
    >
      <router-link class="tag" :to="item.fullPath">
        {{ item.meta.title }}
      </router-link>
      <n-icon
        v-if="!item.meta.affix"
        size="16"
        @click="removeTab(item)"
        style="margin-left: 4px; cursor: pointer"
      >
        <CloseCircleOutline />
      </n-icon>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.tags-views {
  width: 100%;
  height: 48px;
  background-color: #fff;
  border-bottom: 1px solid #f0f0f0;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  padding: 0 12px;
  display: flex;
  align-items: center;
  gap: 12px;

  .tags {
    display: flex;
    padding: 0 12px;
    align-items: center;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    height: 32px;
    line-height: 32px;
    font-size: 12px;
    white-space: nowrap;
    color: #333333;

    &:hover {
      color: var(--n-color);
      border-color: var(--n-border-hover);
    }
  }
}
</style>
