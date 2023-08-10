<script setup lang="ts"></script>
<template>
    <div class="shadow-lg overflow-hidden rounded-lg p-6 py-2 bg-gray-950">
        <div class="overflow-hidden rounded-3xl">
            <slot name="image"></slot>
        </div>
        <div class="">
            <h4 class="">
                <slot name="heading"> Default card heading goes here </slot>
            </h4>
            <div class="">
                <slot></slot>
            </div>
        </div>
    </div>
</template>
