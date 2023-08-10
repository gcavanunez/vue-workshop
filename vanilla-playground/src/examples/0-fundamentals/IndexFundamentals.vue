<script setup>
import WatchExample from './WatchExample.vue'
import WatchEffectExample from './WatchEffectExample.vue'
import ExampleLayout from '@/components/ExampleLayout.vue'
</script>
<template>
    <ExampleLayout>
        <div class="p-6">
            <h1>watch vs watchEffect</h1>
            <WatchExample />
            <WatchEffectExample />
        </div>
    </ExampleLayout>
</template>
