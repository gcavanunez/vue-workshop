<script setup lang="ts">
import { ref, computed, watch } from 'vue';

const counter = ref(0);
const doubled = computed(() => counter.value * 2);
watch(counter, (newValue, oldValue) => {
    if (newValue % 2 === 0) {
        window.alert('Its par!');
    }
});
</script>

<template>
    <div>
        <button class="btn" @click="counter += 1">+</button>
        <span>{{ counter }}</span>
        <button class="btn" @click="counter -= 1">-</button>
        {{ doubled }}
    </div>
</template>

<style>
.btn {
    background: blue;
    width: 2rem;
    height: 2rem;
}
</style>
