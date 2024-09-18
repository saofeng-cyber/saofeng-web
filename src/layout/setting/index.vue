<script setup lang="ts">
import {
  SettingsOutline as SettingsIcon,
  Moon,
  SunnySharp
} from '@vicons/ionicons5';
import { useDesignSettingStore } from '@/store/modules/designSetting';
const settingStore = useDesignSettingStore();
const active = ref(false);
const placement = ref('right');
const toTheme = (val: string) => {
  settingStore.setTheme(val);
};
const restTheme = () => {
  settingStore.resetTheme();
};
</script>
<template>
  <div class="setting_container">
    <n-button type="default" circle size="large" @click="active = true">
      <template #icon>
        <n-icon>
          <SettingsIcon />
        </n-icon>
      </template>
    </n-button>
    <n-drawer v-model:show="active" :width="320" :placement="placement">
      <n-drawer-content title="系统设置">
        <n-divider title-placement="center">主题</n-divider>
        <div class="flex justify-center dark-switch">
          <n-switch
            v-model:value="settingStore.darkTheme"
            size="large"
            class="dark-theme-switch"
          >
            <template #checked>
              <n-icon size="14" color="#ffd93b">
                <SunnySharp />
              </n-icon>
            </template>
            <template #unchecked>
              <n-icon size="14" color="#ffd93b">
                <Moon />
              </n-icon>
            </template>
          </n-switch>
        </div>
        <n-divider title-placement="center">系统主题</n-divider>
        <div class="flex flex-wrap items-center gap-2 p-3">
          <div
            class="w-5 h-5 leading-5 text-center rounded-sm cursor-pointer"
            v-for="(item, index) in settingStore.appThemeList"
            :key="index"
            :style="{ 'background-color': item }"
            @click="toTheme(item)"
          >
            <span v-if="item === settingStore.appTheme" class="text-white"
              >√</span
            >
          </div>
        </div>
        <n-divider title-placement="center">界面功能</n-divider>
        <n-space
          justify="space-between"
          align="center"
          :item-style="{ padding: '12px 0' }"
        >
          <div class="drawer-setting-item-title">折叠菜单</div>
          <n-switch />
        </n-space>
        <n-space
          justify="space-between"
          align="center"
          :item-style="{ padding: '12px 0' }"
        >
          <div class="drawer-setting-item-title">固定顶栏</div>
          <n-switch />
        </n-space>
        <n-space
          justify="space-between"
          align="center"
          :item-style="{ padding: '12px 0' }"
        >
          <div class="drawer-setting-item-title">左侧菜单宽度</div>
          <n-input-number
            v-model:value="settingStore.sideWidth"
            placeholder="请输入"
            style="width: 120px"
          />
        </n-space>
        <template #footer>
          <n-button type="primary" round @click="restTheme">
            <template #icon>
              <n-icon>
                <SettingsIcon />
              </n-icon>
            </template>
            重置配置
          </n-button>
        </template>
      </n-drawer-content>
    </n-drawer>
  </div>
</template>
<style lang="scss" scoped>
.setting_container {
  position: fixed;
  z-index: 10;
  right: 26px;
  bottom: 86px;
}

.dark-switch .n-switch {
  ::v-deep(.n-switch__rail) {
    background-color: #000e1c;
  }
}
</style>
