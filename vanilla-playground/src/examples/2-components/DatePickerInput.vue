<script setup lang="ts">
import Pikaday from 'pikaday'
import 'pikaday/css/pikaday.css'
import { onMounted, ref } from 'vue'

const props = defineProps(['modelValue'])
const input = ref<HTMLInputElement | null>(null)

const emit = defineEmits(['update:modelValue'])
onMounted(() => {
    const picker = new Pikaday({
        field: input.value,
        format: 'D/M/YYYY',
        onSelect: () => {
            emit('update:modelValue', picker.toString())
        }
    })
})
</script>
<template>
    <input :value="props.modelValue" ref="input" />
</template>
