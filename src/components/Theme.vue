<script setup lang="ts">
import { useChangeTheme } from '@/hooks/changeTheme';

const { changeTheme, isDark } = useChangeTheme();
</script>

<template>
  <div class="px-4 cursor-pointer" @click="changeTheme">
    <SvgIcon :name="isDark ? 'moon' : 'sun'" :width="18" :height="18" />
  </div>
</template>
