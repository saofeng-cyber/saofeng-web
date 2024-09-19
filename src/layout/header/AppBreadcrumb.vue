<script setup lang="ts">
import type { RouteLocationNormalizedLoadedGeneric } from 'vue-router';

interface Option {
  label: string;
  key: string;
  options?: Option[];
}
const route = useRoute();
const router = useRouter();
const breadcrumbArr = ref<Array<Option>>([]);

const dropdownSelect = (key: string) => {
  router.push({ path: key });
};

// 生成面包屑

const generateBreadcrumb = (
  routerMap: RouteLocationNormalizedLoadedGeneric
) => {
  breadcrumbArr.value = [];
  routerMap.matched.forEach((item) => {
    breadcrumbArr.value.push({
      label: item.meta.title as string,
      key: item.path,
      options: item.children.map((child) => {
        return {
          label: (child.meta as any).title,
          key: child.path
        };
      })
    });
  });
};

watch(
  route,
  (newRoute) => {
    generateBreadcrumb(newRoute);
  },
  { immediate: true }
);
</script>
<template>
  <div>
    <n-breadcrumb>
      <n-breadcrumb-item v-for="(item, index) in breadcrumbArr" :key="index">
        <n-dropdown :options="item.options" @select="dropdownSelect">
          <div class="trigger">
            {{ item.label }}
          </div>
        </n-dropdown>
      </n-breadcrumb-item>
    </n-breadcrumb>
  </div>
</template>
