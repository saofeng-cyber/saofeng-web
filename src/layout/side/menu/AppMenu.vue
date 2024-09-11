<template>
  <n-menu
    :value="route.name"
    :collapsed="collapsed"
    :collapsed-width="64"
    :indent="24"
    accordion
    :collapsed-icon-size="22"
    :options="menuOptions"
    @update:value="clickMenuItem"
  />
</template>

<script lang="ts" setup>
import { useAsyncRouteStore } from '@/store/modules/asyncRoute';
import { type MenuOption } from 'naive-ui';
import type { RouteRecordRaw } from 'vue-router';
const asyncRouteStore = useAsyncRouteStore();
const route = useRoute();
const router = useRouter();

defineProps<{
  collapsed: boolean;
}>();

// 递归生成菜单
const createMenu = (routes: RouteRecordRaw[]): MenuOption[] => {
  const menuList = routes.map((item: RouteRecordRaw) => {
    return {
      label: item.meta?.title,
      key: item.name,
      icon: item.meta?.icon,
      children: item.children && createMenu(item.children)
    };
  });
  return menuList as unknown as MenuOption[];
};

const clickMenuItem = (key: string) => {
  if (/http(s)?:/.test(key)) {
    window.open(key);
  } else {
    router.push({ name: key });
  }
};

const menuOptions = createMenu(asyncRouteStore.asyncRoutes);
</script>
