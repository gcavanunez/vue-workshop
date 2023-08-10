<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const props = defineProps<{ url: string }>()
const data = ref(null)
const loading = ref(false)
watchEffect(async () => {
    loading.value = true
    setTimeout(async () => {
        const response = await fetch(props.url)
        data.value = await response.json()
        loading.value = false
    }, 3000)
})
</script>
<template>
    <slot v-bind="{ data, loading }" />
</template>
