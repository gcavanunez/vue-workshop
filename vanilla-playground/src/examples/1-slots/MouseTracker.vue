<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const x = ref(0)
const y = ref(0)

function update(event) {
    x.value = event.pageX
    y.value = event.pageY
}

onMounted(() => window.addEventListener('mousemove', update))
onUnmounted(() => window.removeEventListener('mousemove', update))
</script>
<template>
    <slot v-bind="{ x, y }" />
</template>

<!-- <script>
import { ref, onMounted, onUnmounted } from 'vue'
export default {
    setup(_, { slots }) {
        const x = ref(0)
        const y = ref(0)

        function update(event) {
            x.value = event.pageX
            y.value = event.pageY
        }

        onMounted(() => window.addEventListener('mousemove', update))
        onUnmounted(() => window.removeEventListener('mousemove', update))

        return () => slots.default({ x, y })
    }
}
</script> -->
