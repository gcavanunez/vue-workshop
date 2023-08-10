<script lang="ts" setup>
defineProps<{
    color: string
}>()
</script>

<template>
    <h3 :style="{ color: color }" class="text-xl">
        <slot />
    </h3>
</template>
