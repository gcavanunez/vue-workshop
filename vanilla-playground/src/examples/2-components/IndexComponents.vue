<script setup lang="ts">
import { ref } from 'vue'
const email = ref('email@gmail.com')
import AppInput from './AppInput.vue'
import ExampleLayout from '@/components/ExampleLayout.vue'
import DatePickerInput from './DatePickerInput.vue'
import DateRangePicker from './DateRangePicker.vue'
const date = ref('')
// const format = ref('d/m/Y')
const range = ref(['2022/01/01', '2022/01/10'])
</script>
<template>
    <ExampleLayout>
        <div class="p-6 h-[800px]">
            <h1>Simple Input</h1>
            <div class="space-x-4 text-gray-600">
                <AppInput v-model="email" />
                <span class="text-white">{{ email }}</span>
            </div>
        </div>
        <div class="p-6 h-[800px]">
            <h1>Date picker - pickaday.js</h1>
            <div class="space-x-4 text-gray-600">
                <DatePickerInput v-model="date" />
                <span class="text-white">{{ date }}</span>
            </div>
        </div>
        <div class="p-6 h-[800px]">
            <h1>Date range picker - flatpickr.js</h1>
            <div class="text-gray-600">
                <div>
                    <DateRangePicker v-model="range" />
                    <!-- <input v-model="format" /> -->
                </div>
                <div class="mt-4 text-white">{{ range }}</div>
            </div>
        </div>
    </ExampleLayout>
</template>
