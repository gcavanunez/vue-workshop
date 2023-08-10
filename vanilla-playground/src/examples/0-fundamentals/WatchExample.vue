<script setup>
import { ref, watch } from 'vue'

const todoId = ref(1)
const data = ref(null)

watch(
    todoId,
    async () => {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId.value}`)
        data.value = await response.json()
    },
    { immediate: true }
)
</script>

<template>
    <h3>Watch example</h3>
    <button @click="todoId++" class="bg-blue-600 rounded px-2">Increment ID: {{ todoId }}</button>
    <pre>{{ data }}</pre>
</template>
