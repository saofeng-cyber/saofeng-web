<script setup lang="ts">
import {
  QuestionCircleOutlined,
  ReloadOutlined,
  ColumnHeightOutlined
} from '@vicons/antd';
import type { TableColumn } from 'naive-ui/es/data-table/src/interface';
import { createTableContext } from './hooks/useTableContext';
defineProps({
  title: {
    type: String,
    default: ''
  },
  titleTooltip: {
    type: String,
    default: ''
  },
  data: {
    type: Array<any>,
    default: () => []
  },
  columns: {
    type: Array<TableColumn>,
    default: () => []
  }
});

const isStriped = ref(false);

const setStriped = (value: boolean) => {
  isStriped.value = value;
};

const reload = () => {
  console.log('reload');
};

const densityOptions = [
  {
    type: 'menu',
    label: '紧凑',
    key: 'small'
  },
  {
    type: 'menu',
    label: '默认',
    key: 'medium'
  },
  {
    type: 'menu',
    label: '宽松',
    key: 'large'
  }
];

const tableSize = ref('medium');

const densitySelect = (key: string) => {
  tableSize.value = key;
};

const tableRef = ref(null);
onMounted(() => {
  console.log('tableRef', tableRef.value);
  createTableContext(tableRef.value!);
});
</script>
<template>
  <div class="custom-table">
    <div class="table-toolbar">
      <!--顶部左侧区域-->
      <div class="table-toolbar-left">
        <template v-if="title">
          <div class="table-toolbar-left-title">
            {{ title }}
            <n-tooltip trigger="hover" v-if="titleTooltip">
              <template #trigger>
                <n-icon size="18" class="ml-1 text-gray-400 cursor-pointer">
                  <QuestionCircleOutlined />
                </n-icon>
              </template>
              {{ titleTooltip }}
            </n-tooltip>
          </div>
        </template>
        <slot name="tableTitle"></slot>
      </div>
      <!-- 顶部右侧区域 -->
      <div class="table-toolbar-right">
        <slot name="tableToolbar"></slot>
        <!--斑马纹-->
        <n-tooltip trigger="hover">
          <template #trigger>
            <div class="mr-2 table-toolbar-right-icon">
              <n-switch v-model:value="isStriped" @update:value="setStriped" />
            </div>
          </template>
          <span>表格斑马纹</span>
        </n-tooltip>
        <n-divider vertical />

        <!--刷新-->
        <n-tooltip trigger="hover">
          <template #trigger>
            <div class="table-toolbar-right-icon" @click="reload">
              <n-icon size="18">
                <ReloadOutlined />
              </n-icon>
            </div>
          </template>
          <span>刷新</span>
        </n-tooltip>

        <!--密度-->
        <n-tooltip trigger="hover">
          <template #trigger>
            <div class="table-toolbar-right-icon">
              <n-dropdown
                @select="densitySelect"
                trigger="click"
                :options="densityOptions"
                v-model:value="tableSize"
              >
                <n-icon size="18">
                  <ColumnHeightOutlined />
                </n-icon>
              </n-dropdown>
            </div>
          </template>
          <span>密度</span>
        </n-tooltip>

        <ColumnSetting />
      </div>
    </div>
    <div class="s-table">
      <n-data-table
        ref="tableRef"
        :columns="columns"
        :data="data"
        :striped="isStriped"
        :size="tableSize"
      ></n-data-table>
    </div>
  </div>
</template>

<style scoped lang="scss">
.custom-table {
  padding: 16px;

  .table-toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;

    .table-toolbar-right {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: flex-end;

      &-icon {
        margin-left: 12px;
        font-size: 16px;
        cursor: pointer;
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>
