<script setup>
import { computed } from 'vue'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const value = computed({
    get() {
        return props.modelValue
    },
    set(value) {
        emit('update:modelValue', value)
    }
})
</script>
<template>
    <!-- <input :value="modelValue" @input="(e) => $emit('update:modelValue', e.target.value)" /> -->
    <!-- <input v-model="value" /> -->
    <div class="text-white space-x-3">
        <button @click="value = 'joe@gmail.com'">Set value to joe@gmail.com</button>
        <button @click="value = ''">Set value to blank</button>
    </div>
</template>
