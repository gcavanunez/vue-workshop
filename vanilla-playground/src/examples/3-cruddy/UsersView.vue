<script setup lang="ts">
import { ref } from 'vue'
import AppTable from './AppTable.vue'
import { useUserForm } from './use-user-form'
type User = {
    id: number
    name: string
    email: string
    phone: string
    website: string
}

const users = ref<User[]>([])
fetch('https://jsonplaceholder.typicode.com/users')
    .then((res) => res.json())
    .then((data) => {
        users.value = data as User[]
    })

const { cancel, save, triggerDelete, triggerUpdate, userForm } = useUserForm(users)
</script>
<template>
    <div>
        <!-- Form Area -->
        <div>
            <form class="text-gray-700 bg-gray-100 p-6" @submit.prevent="save">
                <div class="grid grid-cols-2 gap-4">
                    <input placeholder="Name" v-model="userForm.name" />
                    <input placeholder="Email" v-model="userForm.email" />
                    <input placeholder="Phone" v-model="userForm.phone" />
                    <input placeholder="Website" v-model="userForm.website" />
                </div>
                <div class="flex justify-end">
                    <div class="space-x-4">
                        <button
                            class="border border-gray-500 bg-white px-3 mt-3"
                            type="button"
                            @click="cancel"
                        >
                            Cancel
                        </button>
                        <button class="border border-gray-500 bg-white px-3 mt-3" type="submit">
                            Save
                        </button>
                    </div>
                </div>
            </form>
        </div>
        <!-- List/Table Area -->
        <div>
            <!-- <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-100">
                    <tr>
                        <th scope="col" className="px-4 py-3 text-left text-sm  text-gray-900 ">
                            Name
                        </th>
                        <th scope="col" className="px-4 py-3 text-left text-sm  text-gray-900 ">
                            Email
                        </th>
                        <th scope="col" className="px-4 py-3 text-left text-sm  text-gray-900 ">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white ">
                    <tr v-for="user in users" :key="user.id">
                        <td className="px-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                            {{ user.name }}
                        </td>
                        <td className="px-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                            {{ user.email }}
                        </td>
                        <td className="px-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                            <div class="space-x-4">
                                <button
                                    class="border border-gray-500 bg-white px-1"
                                    @click="triggerUpdate(user)"
                                >
                                    Edit
                                </button>
                                <button
                                    class="border border-gray-500 bg-white px-1"
                                    @click="triggerDelete(user)"
                                >
                                    Delete
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table> -->
            <AppTable
                :cols="[
                    { key: 'name', label: 'Name' },
                    { key: 'email', label: 'Email' },
                    { key: 'actions', label: '' }
                ]"
                :rows="users"
            >
                <template #cell-actions="{ row }">
                    <div class="space-x-4">
                        <button
                            class="border border-gray-500 bg-white px-1"
                            @click="triggerUpdate(row as User)"
                        >
                            Edit
                        </button>
                        <button
                            class="border border-gray-500 bg-white px-1"
                            @click="triggerDelete(row as User)"
                        >
                            Delete
                        </button>
                    </div>
                </template>
            </AppTable>
        </div>
    </div>
</template>
