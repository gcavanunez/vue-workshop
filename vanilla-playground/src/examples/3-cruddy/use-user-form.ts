import { ref, type Ref } from 'vue'
type User = {
    id: number
    name: string
    email: string
    phone: string
    website: string
}
export function useUserForm(users: Ref<User[]>) {
    const userFormFactory = () => ({ id: 0, name: '', email: '', phone: '', website: '' })
    const userForm = ref(userFormFactory())
    const mode = ref<'insert' | 'update'>('insert')
    const save = () => {
        console.log(userForm.value)
        if (mode.value === 'insert') {
            userForm.value.id = users.value.length + 1
            users.value.push(userForm.value)
        } else {
            const indexOfItem = users.value.findIndex((obj) => obj.id === userForm.value.id)
            users.value.splice(indexOfItem, 1, userForm.value)
        }
        cancel()
    }
    const cancel = () => {
        userForm.value = userFormFactory()
        mode.value = 'insert'
    }
    const triggerUpdate = (user: User) => {
        mode.value = 'update'
        userForm.value.email = user.email
        userForm.value.id = user.id
        userForm.value.website = user.website
        userForm.value.phone = user.phone
        userForm.value.name = user.name
    }
    const triggerDelete = (user: User) => {
        users.value = users.value.filter((storedUser) => storedUser.id !== user.id)
    }
    return {
        userForm,
        mode,
        save,
        cancel,
        triggerDelete,
        triggerUpdate
    }
}
