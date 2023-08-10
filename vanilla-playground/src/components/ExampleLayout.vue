<script setup lang="ts">
defineProps<{ sections?: string[] }>()
</script>
<template>
    <div class="w-full prose dark:prose-invert max-w-none divide-y divide-white/20">
        <slot>
            <div
                class="p-6 max-h-[100vh] min-h-[900px]"
                v-for="section in sections"
                :key="section"
                :id="section"
            >
                <h1>{{ section }}</h1>
                <slot :name="section" />
            </div>
        </slot>
    </div>
</template>
