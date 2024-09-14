<script setup lang="ts">
import { useDesignSettingStore } from '@/store/modules/designSetting';
const settingStore = useDesignSettingStore();
const themeColor = computed({
  get() {
    return settingStore.appTheme;
  },
  set(val) {
    settingStore.setTheme(val);
  }
});
const showPicker = ref(false);
const handleConfirm = () => {
  showPicker.value = false;
};
</script>
<template>
  <div class="console">
    <n-color-picker v-model:value="themeColor" :show="showPicker" :show-alpha="false" style="width: 120px;"
      @update:show="showPicker = $event">
      <template #action>
        <n-button type="primary" size="small" @click="handleConfirm">确定</n-button>
      </template>
    </n-color-picker>
  </div>
</template>
