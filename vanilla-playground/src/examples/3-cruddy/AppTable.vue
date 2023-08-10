<script setup lang="ts">
defineProps<{
    cols: {
        label: string
        key: string
    }[]
    rows: {
        id: string | number
        [key: string]: any
    }[]
}>()
</script>
<template>
    <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-100">
            <tr>
                <th
                    v-for="col in cols"
                    :key="col.key"
                    scope="col"
                    className="px-4 py-3 text-left text-sm  text-gray-900"
                >
                    {{ col.label }}
                </th>
            </tr>
        </thead>
        <tbody className="bg-white ">
            <tr v-for="row in rows" :key="row.id">
                <td
                    v-for="col in cols"
                    :key="`${row.id}-${col.key}`"
                    className="px-4 text-sm font-medium text-gray-700 whitespace-nowrap"
                >
                    <slot :name="'cell-' + col.key" :row="row">{{ row[col.key] }}</slot>
                </td>
            </tr>
        </tbody>
    </table>
</template>
