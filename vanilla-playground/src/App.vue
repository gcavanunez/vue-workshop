<script setup lang="ts">
import IndexFundamentals from '@/examples/0-fundamentals/IndexFundamentals.vue'
import IndexSlot from '@/examples/1-slots/IndexSlots.vue'
import IndexCruddy from '@/examples/3-cruddy/IndexCruddy.vue'
import IndexComponents from '@/examples/2-components/IndexComponents.vue'
import { computed, ref } from 'vue'
const selectedPage = ref('fundamentals')
const options = [
    { value: 'fundamentals', text: 'Fundamentals' },
    { value: 'slot', text: 'Slot page' },
    { value: 'inputs', text: 'Inputs' },
    { value: 'data', text: 'Cruddy example' }
]
const selectedComponent = computed(() => {
    switch (selectedPage.value) {
        case 'fundamentals':
            return IndexFundamentals
        case 'slot':
            return IndexSlot
        case 'data':
            return IndexCruddy
        case 'inputs':
            return IndexComponents

        default:
            return IndexSlot
    }
})
</script>

<template>
    <header></header>

    <main class="py-20">
        <div class="mx-auto w-full max-w-3xl px-4 py-2 md:px-6 lg:pb-5 lg:pt-8">
            <div class="flex justify-between">
                <h1 class="text-2xl font-semibold text-white lg:text-3xl lg:tracking-tight">
                    Examples
                </h1>
                <select
                    v-model="selectedPage"
                    class="rounded-lg bg-gray-800 border-white/10 text-white"
                >
                    <option v-for="option in options" :key="option.value" :value="option.value">
                        {{ option.text }}
                    </option>
                </select>
            </div>
            <div class="mt-6 flex w-full flex-col shadow-xl">
                <div
                    class="relative flex min-w-0 rounded-lg bg-gray-800 ring-1 ring-inset ring-white/10"
                >
                    <component :is="selectedComponent" />
                </div>
            </div>
        </div>
    </main>
</template>
