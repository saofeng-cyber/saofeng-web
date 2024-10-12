<template>
  <iframe
    :src="route.meta.externalLink"
    scrolling="yes"
    frameborder="0"
    class="iframe"
  />
</template>
<script setup lang="ts">
const route = useRoute();
</script>
<style scoped>
.iframe {
  position: relative;
  width: 100%;
  height: calc(100vh - 138px);
  overflow: hidden;
}
</style>
