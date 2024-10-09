<script setup lang="ts">
import type { TableColumn } from 'naive-ui/es/data-table/src/interface';

const tableColumns = ref<Array<TableColumn>>([
  {
    title: '姓名',
    key: 'name'
  },
  {
    title: '年龄',
    key: 'age'
  },
  {
    title: '地址',
    key: 'address'
  },
  {
    title: '操作',
    key: 'action'
  }
]);
const tableData = ref([
  {
    name: '张三',
    age: 18,
    address: '北京市朝阳区'
  },
  {
    name: '李四',
    age: 20,
    address: '上海市浦东新区'
  },
  {
    name: '王五',
    age: 22,
    address: '广州市天河区'
  },
  {
    name: '赵六',
    age: 24,
    address: '深圳市南山区'
  },
  {
    name: '钱七',
    age: 26,
    address: '成都市锦江区'
  },
  {
    name: '孙八',
    age: 28,
    address: '杭州市西湖区'
  },
  {
    name: '周九',
    age: 30,
    address: '武汉市江汉区'
  },
  {
    name: '吴十',
    age: 32,
    address: '南京市鼓楼区'
  },
  {
    name: '郑十一',
    age: 34,
    address: '长沙市岳麓区'
  },
  {
    name: '王十二',
    age: 36,
    address: '青岛市市南区'
  },
  {
    name: '冯十三',
    age: 38,
    address: '天津市和平区'
  }
]);
</script>
<template>
  <div class="user_role">
    <CustomTable
      title="用户角色"
      titleTooltip="用户角色"
      :columns="tableColumns"
      :data="tableData"
    />
  </div>
</template>
<style lang="scss" scoped>
.user_role {
  position: relative;
}
</style>
