<script lang="ts" setup></script>

<template>
    <div class="grid grid-cols-3 gap-6">
        <main class="col-span-2 bg-gray-700 rounded-lg p-6 h-96">
            <slot name="main" />
        </main>
        <aside class="bg-gray-700 rounded-lg p-6">
            <slot name="sidebar" />
        </aside>
    </div>
    <footer class="bg-gray-700 rounded-lg mt-6 p-6 h-48">
        <slot name="footer" />
    </footer>
</template>
