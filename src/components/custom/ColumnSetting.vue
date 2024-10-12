<script setup lang="ts">
import { SettingsOutline as SettingsIcon } from '@vicons/ionicons5';
import { useTableContext } from './hooks/useTableContext';
const table: any = useTableContext();
console.log(table);
const state = reactive({
  selection: false,
  checkAll: true,
  checkList: [],
  defaultCheckList: []
});

const onCheckAll = (e: boolean) => {
  if (e) {
    state.checkList = table.columns.map((item: any) => item.key);
  } else {
    state.checkList = [];
  }
};

const onSelection = (e: boolean) => {
  table.selection = e;
};

const resetColumns = () => {
  state.checkList = state.defaultCheckList;
};
</script>
<template>
  <n-popover
    trigger="click"
    :width="230"
    class="toolbar-popover"
    placement="bottom-end"
  >
    <template #trigger>
      <n-icon class="ml-3 cursor-pointer" size="18">
        <SettingsIcon />
      </n-icon>
    </template>
    <template #header>
      <div class="table-toolbar-inner-popover-title">
        <n-space>
          <n-checkbox
            v-model:checked="state.checkAll"
            @update:checked="onCheckAll"
            >列展示</n-checkbox
          >
          <n-checkbox
            v-model:checked="state.selection"
            @update:checked="onSelection"
            >勾选列</n-checkbox
          >
          <n-button
            text
            type="info"
            size="small"
            class="mt-1"
            @click="resetColumns"
            >重置</n-button
          >
        </n-space>
      </div>
    </template>
    <div class="px-2">
      <n-checkbox label="显示序号" />
      <n-checkbox label="显示名称" />
      <n-checkbox label="显示状态" />
      <n-checkbox label="显示操作" />
    </div>
  </n-popover>
</template>
