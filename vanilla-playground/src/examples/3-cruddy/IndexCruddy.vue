<script setup lang="ts">
import ExampleLayout from '@/components/ExampleLayout.vue'
import UsersView from './UsersView.vue'
</script>

<template>
    <ExampleLayout>
        <div class="p-6 min-h-[800px]">
            <h1>Common Case</h1>
            <UsersView />
        </div>
    </ExampleLayout>
</template>
