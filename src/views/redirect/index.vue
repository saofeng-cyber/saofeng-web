<template>
    <div> </div>
</template>
<script setup lang="ts">
const route = useRoute();
const router = useRouter();
const path = route.query.path as string;
router.push({ path });
</script>