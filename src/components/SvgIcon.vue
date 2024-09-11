<script setup lang="ts">
const props = defineProps({
  prefix: {
    type: String,
    default: 'icon'
  },
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: '#333'
  },
  width: {
    type: Number,
    default: 1
  },
  height: {
    type: Number,
    default: 1
  }
});
const symbolId = computed(() => `#${props.prefix}-${props.name}`);
</script>
<template>
  <svg aria-hidden="true" :width="width" :height="height">
    <use :href="symbolId" :fill="color" />
  </svg>
</template>
