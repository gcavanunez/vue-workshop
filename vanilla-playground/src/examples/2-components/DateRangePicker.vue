<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import flatpickr from 'flatpickr'
import 'flatpickr/dist/flatpickr.css'
import type { BaseOptions } from 'flatpickr/dist/types/options'

const props = withDefaults(
    defineProps<{ modelValue: string[]; format: string; config?: Partial<BaseOptions> }>(),
    {
        format: 'Y/m/d'
    }
)
const input = ref<HTMLInputElement | null>(null)
const emit = defineEmits(['update:modelValue'])
onMounted(() => {
    if (!input.value) {
        return
    }
    let picker = flatpickr(input.value, {
        mode: 'range',
        dateFormat: props.format,
        defaultDate: props.modelValue,
        onChange: (date, dateString) => {
            emit('update:modelValue', dateString.split(' to '))
        },
        ...props.config
    })
    watch(
        () => props.modelValue,
        () => {
            picker.setDate(props.modelValue)
        }
    )

    // watch(
    //     () => props.format,
    //     () => {
    //         picker.config.dateFormat = props.format
    //     }
    // )
})
</script>
<template>
    <input :value="props.modelValue" ref="input" class="w-full" />
</template>
