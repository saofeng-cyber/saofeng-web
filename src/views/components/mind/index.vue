<script setup lang="ts">
import MindMap from 'vue3-mindmap';
import 'vue3-mindmap/dist/style.css';
const data = ref([
  {
    name: '如何学习D3',
    children: [
      {
        name: '预备知识',
        children: [{ name: 'HTML & CSS' }, { name: 'JavaScript' }]
      },
      {
        name: '安装',
        children: [{ name: '折叠节点' }]
      },
      { name: '进阶', left: true }
    ]
  }
]);
const mapConfig = reactive({
  branch: 1,
  timetravel: true,
  drag: true,
  zoom: true,
  edit: true,
  'center-btn': true,
  'fit-btn': true,
  'add-node-btn': true,
  'download-btn': true,
  'sharp-corner': false,
  ctm: true
});
</script>
<template>
  <div class="mind-map-container">
    <MindMap v-model="data" v-bind="mapConfig"></MindMap>
  </div>
</template>
<style scoped lang="scss">
.mind-map-container {
  position: relative;
  width: 100%;
  height: calc(100vh - 138px);
  border-radius: 4px;
  overflow: hidden;
}
</style>
