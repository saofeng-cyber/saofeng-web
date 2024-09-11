<script setup lang="ts">
interface Option {
  label: string;
  key: string;
  href: string;
  options?: Option[];
}
const route = useRoute();
const breadcrumbArr = ref<Array<Option>>([]);

watch(
  route,
  (newRoute) => {
    breadcrumbArr.value = [];
    newRoute.matched.forEach((item) => {
      breadcrumbArr.value.push({
        label: item.meta.title as string,
        key: (item.meta as any).title,
        href: item.path,
        options: item.children.map((child) => {
          return {
            label: (child.meta as any).title,
            key: child.path,
            href: child.path
          };
        })
      });
    });
  },
  { immediate: true }
);
</script>
<template>
  <div>
    <n-breadcrumb>
      <n-breadcrumb-item v-for="(item, index) in breadcrumbArr" :key="index">
        <n-dropdown :options="item.options">
          <div class="trigger">
            {{ item.label }}
          </div>
        </n-dropdown>
      </n-breadcrumb-item>
    </n-breadcrumb>
  </div>
</template>
