<script setup lang="ts">
import {
  VueDataUi,
  type VueUiSparklineConfig,
  type VueUiSparklineDatasetItem
} from 'vue-data-ui';
import 'vue-data-ui/style.css';

const config = ref<VueUiSparklineConfig>({});

const dataset = ref<VueUiSparklineDatasetItem[]>([
  {
    period: 'period 1',
    value: 0
  },
  {
    period: 'period 2',
    value: -1
  },
  {
    period: 'period 3',
    value: 2
  },
  {
    period: 'period 4',
    value: -3
  },
  {
    period: 'period 5',
    value: 4
  },
  {
    period: 'period 6',
    value: -5
  },
  {
    period: 'period 7',
    value: 6
  },
  {
    period: 'period 8',
    value: -7
  },
  {
    period: 'period 9',
    value: 8
  },
  {
    period: 'period 10',
    value: -9
  },
  {
    period: 'period 11',
    value: 10
  },
  {
    period: 'period 12',
    value: -11
  },
  {
    period: 'period 13',
    value: 12
  },
  {
    period: 'period 14',
    value: -13
  },
  {
    period: 'period 15',
    value: 14
  },
  {
    period: 'period 16',
    value: -15
  },
  {
    period: 'period 17',
    value: 16
  }
]);
</script>

<template>
  <div style="width: 100%; height: 100%">
    <VueDataUi component="VueUiSparkline" :dataset="dataset" :config="config" />
  </div>
</template>
