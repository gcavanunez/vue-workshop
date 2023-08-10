<script setup>
import { ref, watchEffect } from 'vue'

const todoId = ref(1)
const data = ref(null)

watchEffect(async () => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId.value}`)
    data.value = await response.json()
})
</script>

<template>
    <h3>watchEffect Example</h3>
    <button @click="todoId++" class="bg-blue-600 rounded px-2">Increment ID: {{ todoId }}</button>
    <pre>{{ data }}</pre>
</template>
