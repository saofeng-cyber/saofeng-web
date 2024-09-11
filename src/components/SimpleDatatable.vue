<script setup lang="ts">
import { DataTable } from 'simple-datatables';
import 'simple-datatables/dist/style.css';
const dataTableOptions = reactive({
  header: true,
  searchable: true,
  fixedHeight: true,
  fixedColumns: true,
  classes: {
    active: 'datatable-active', // will be "datatable-active" in version 7
    bottom: 'datatable-bottom',
    container: 'datatable-container',
    dropdown: 'datatable-dropdown',
    ellipsis: 'ellipsis', // will be "datatable-ellipsis" in version 7
    empty: 'datatable-empty',
    headercontainer: 'datatable-headercontainer',
    info: 'datatable-info',
    input: 'datatable-input',
    loading: 'datatable-loading',
    pagination: 'datatable-pagination',
    paginationList: 'datatable-pagination-list',
    search: 'datatable-search',
    selector: 'datatable-selector',
    sorter: 'datatable-sorter',
    table: 'datatable-table',
    top: 'datatable-top',
    wrapper: 'datatable-wrapper'
  }
});
const newData = {
  headings: ['NAME', 'POSITION', 'OFFICE', 'AGE', 'STARTDATE', 'SALARY'],
  data: [
    [
      'Tiger Nixon',
      'System Architect',
      'Edinburgh',
      '61',
      '2011/04/25',
      '$320,800'
    ]
  ]
};
const initDataTable = () => {
  const dataTable = new DataTable('#myTable', dataTableOptions);
  for (let i = 0; i < 99; i++) {
    newData.data.push([
      'Tiger Nixon',
      'System Architect',
      'Edinburgh',
      '61',
      '2011/04/25',
      '$320,800'
    ]);
  }
  dataTable.insert(newData);
};
onMounted(() => {
  initDataTable();
});
</script>
<template>
  <div id="myTable" />
</template>
<style lang="scss">
.datatable-active {
  & a {
    background: 0 0;
    background-image: linear-gradient(310deg, var(--el-color-primary), #2dcecc);
    box-shadow:
      0 7px 14px rgb(50 50 93 / 10%),
      0 3px 6px rgb(0 0 0 / 8%);
    color: #fff;
    border: none;
    border-radius: 50% !important;
  }
}

.datatable-bottom {
  padding: 1.5rem;
  padding-bottom: 0;
}

.datatable-pagination .datatable-pagination-list-item {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 3px;
  border-radius: 50% !important;
  overflow: hidden;

  &:hover {
    background-color: #e9ecef;
    color: #000000;
  }
}

.datatable-pagination button {
  margin-left: 0;
}

.datatable-pagination .datatable-pagination-list-item button {
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 50% !important;
}

.datatable-search {
  font-size: 14px;
  color: #495057;
  border: var(--n-color);
  border-radius: 8px;
}

.datatable-info {
  color: #8392ab;
  font-size: 14px;
}

.datatable-input {
  border-radius: 8px;
  font-size: 14px;
  color: #495057;
  border: 1px solid #e9ecef;
  padding: 6px 12px;

  &:focus-visible {
    outline: none;
  }

  &:focus {
    border-style: solid;
    border-width: 1px;
    border-color: var(--el-color-primary);
  }
}
</style>
