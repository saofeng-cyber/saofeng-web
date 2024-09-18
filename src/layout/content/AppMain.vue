<template>
  <div class="layout-main">
    <n-scrollbar :x-scrollable="false">
      <div class="layout-content-main">
        <RouterView>
          <template #default="{ Component, route }">
            <transition mode="out-in" name="slide-x" appear>
              <keep-alive>
                <component :is="Component" :key="route.fullPath" />
              </keep-alive>
            </transition>
          </template>
        </RouterView>
      </div>
      <Setting />
      <n-back-top :right="100" />
    </n-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import Setting from '../setting/index.vue';
</script>
<style lang="scss" scoped>
.layout-main {
  width: 100%;
  height: calc(100% - 48px - 64px);
}

.layout-content-main {
  width: 100%;
  height: 100%;
  padding: 16px;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease-in-out;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

/*
  进入和离开动画可以使用不同
  持续时间和速度曲线。
*/
.slide-x-enter-active {
  transition: all 0.3s ease-out;
}

.slide-x-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-x-enter-from,
.slide-x-leave-to {
  transform: translateX(30px);
  opacity: 0;
}
</style>
