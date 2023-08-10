---
theme: default
highlighter: shiki
lineNumbers: false
info: |
  ## Leveling up Vue skills
  
  Overview and patterns for working with Vue

  [Guillermo Cava](https://guillermocava.com)
drawings:
  persist: false
transition: slide-left
title: Leveling up Vue Skills
hideInToc: true
---

# Leveling up Vue skills

Overview and patterns for working with Vue



---
hideInToc: true
layout: intro
---

# 👋 Hey!

##  I'm Guillermo Cava



<!--

Highlights:

- Been working with Vue since 2018 
- Have used Vue for writing SSR apps, Native Apps and Data intensive applications
- Have used lots of the mayor Component and Core libs for quite some time 

-->


---
layout: default
hideInToc: true
---

# Setting the stage

<v-clicks>

- You know some javascript
- We'll mainly focus on Vue 3 and composition
- We won't 
  - touch styles and styling too deeply
  - be touching the basics 
  - be touching on the extremely complex

</v-clicks>


<!--
Pointers 

1. We'll reach for typescript in most code examples
2. We'll use tailwind to style most things this is not a css workshop
3. Composition API all the way
4. The don'ts for the sake of time
-->

---
transition: fade-out
hideInToc: true
---

# Agenda


<Toc  maxDepth="1"></Toc>

<!-- 
The plan for today

- we'll first cover in my opinion the core Vuejs parts (state primitives and life cyles)
- we'll then explore patterns, best practices and Vue's unique offering
- we'll interweave code examples and run through some exercises 

 -->

---
transition: slide-up
---

# Reactivity primitives

|     |     |
| --- | --- |
| State | ref |
| Derived state | computed |
| Reactions / side effects | watchers |


<div class="grid grid-cols-2 gap-4">
  <Connections v-click class="mt-4"/>
  <div v-click class="p-4">
    <h3 class="pb-2">SpreadSheet Formula</h3>
    <img class="h-40" src="https://wallstreetmojo.com/wp-content/uploads/2019/01/Division-Formula-in-Excel-Example-1-1.png">
  </div>
</div>


<!-- 

3 core primitives
- state -> declared reactive variables
- derived state -> sum operations, that will return something
- side effects -> when X changes Y should happen, void operations

-->

---
layout: default
level: 2
---

## Reactivity **examples**

<div grid="~ cols-3 gap-4">
<div class="col-span-2">

```vue {all|4,16|5,18|6-10|all} {maxHeight:'45vh'} 
<script setup lang="ts">
import { ref, computed, watch } from 'vue';

const counter = ref(0);
const doubled = computed(() => counter.value * 2);
watch(counter, (newValue, oldValue) => {
    if (newValue % 2 === 0) {
        window.alert('Its even!');
    }
});
</script>

<template>
    <div>
        <button class="btn" @click="counter += 1">+</button>
        <span>{{ counter }}</span>
        <button class="btn" @click="counter -= 1">-</button>
        <div class="">{{ doubled }}</div>
    </div>
</template>

```

</div>
<div>
<BasicCounter />
</div>
</div>

<!--

1. first this is the state being declared and rendered
2. On the right 

-->


---
level: 2
---

# State

<div class="grid grid-cols-2 gap-x-4">

<div>

### Ref

```ts {monaco}
import { ref } from 'vue'

let foo = 0
let bar = ref(0)

foo = 1
bar = 1 // ts-error
```

<div v-click>

###### Pros

- More explicit, with type checking
- Less caveats

###### Cons

- `.value`

</div>

</div>

<div>

### Reactive

```ts {monaco}
import { reactive } from 'vue'

const foo = { prop: 0 }
const bar = reactive({ prop: 0 })

foo.prop = 1
bar.prop = 1
```

<div v-click>

###### Pros

- Auto unwrapping (a.k.a `.value` free)

###### Cons

- Same as plain objects on types
- Destructure loses reactivity
- Need to use callback for `watch`

</div>
</div></div>

---
level: 2
---

# Derived state

<div class="grid grid-cols-2 gap-x-4">


<div>

### Simple Computed

```ts {monaco}
import { ref, computed } from 'vue'

const count = ref(1)
const plusOne = computed(() => count.value + 1)

console.log(plusOne.value) // 2

plusOne.value++ // error
```

<div v-click>

###### Notes

- Great proxies 
- Does smart caching under the hood
- Never do side effects (reach for a watcher)

</div>

</div>

<div>


### Get/Set Computed

```ts {monaco}
import { ref, computed } from 'vue'

const count = ref(1)
const plusOne = computed({
  get(){
    return count.value + 1
  },
  set(newVal){
    count.value = newVal
  }
})

console.log(plusOne.value) // 2

plusOne.value++ // 2 + 1 => 3

console.log(count.value, plusOne.value) // 3 , 4

```

</div>

</div>


---
level: 2
---

# Side effects

<div class="grid grid-cols-2 gap-x-4">


<div>

### Simple watcher

```ts {monaco}
import { ref, watch } from 'vue'

const x = ref(0)
const y = ref(0)

watch(x, (newX) => {
  console.log(`x is ${newX}`)
})

watch(
  () => x.value + y.value,
  (sum) => {
    console.log(`sum of x + y is: ${sum}`)
  }
)

watch([x, () => y.value], ([newX, newY]) => {
  console.log(`x is ${newX} and y is ${newY}`)
})
```


</div>

<div>

###### Notes

- be careful with infinite loops
- Ask yourself: "Is there a way to derive it to value rather than to sync?" (QueryParams, AV Devices)

</div>

</div>
---
level: 2
---

# Side effects

<div class="grid grid-cols-2 gap-x-4">


<div>

### `watch` vs `watchEffect`
<br />

```ts {monaco}
import { ref, watch, watchEffect } from 'vue'

const todoId = ref(1)
const data = ref(null)

watch(todoId, async () => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${todoId.value}`
  )
  data.value = await response.json()
}, { immediate: true })

watchEffect(async () => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${todoId.value}`
  )
  data.value = await response.json()
})

```

</div>

<div>

###### Notes

- `watch` only tracks the explicitly watched source
- `watchEffect` combines dependency tracking and side effect into one phase (like computed)


<br />
<br />

<v-click>

### ➡️ Let's look at some code 

</v-click>


</div>

</div>

<!-- 

Go to first code example around fundamentals

💡Examples 
 -->

---
layout: default
---

# Passing State


|                                | Notes                 | Components                    |
| ------------------------------ | --------------------- | ----------------------------- |
| <b>Props(down) & Emits(up)</b> | Standard, v-model     | Inputs, Forms, Views          |
| Provide & Inject               | Tight coupling        | Disclosures, Lists, Dropdowns |
| Imported ref                   | Global composable     | Themes, Prototyping           |
| Vuex and Pinia                 | Global state via libs | Auth, Settings                |

<br />
<br />

<v-click>

### ➡️ Let's look at some code 

</v-click>

<!--
Props down, Emits ups - Sliders or component that will always render together - Simple global stores - Libraries are way more battle tested

💡Examples 
-->

---
layout: default
---

# Directives

Magic control flow bits

|     |     |
| --- | --- |
| `v-for` | For loops |
| `v-if` | Conditional rendering |
| `v-model` | two-way binding |
| `v-*` | You can create your own! |

<div grid="~ cols-2 gap-2" m="-t-2">
<!-- you may also create your own directives  -->
<!-- v-for -->
<!-- v-if -->
<!-- v-show -->
<!-- v-model -->
</div> 

---
layout: default
---

# Life cycle hooks

<div grid="~ cols-2 gap-4">
<div>

<v-clicks>

- Mounted
  - Listeners
  - Accessing html elements
- Unmounted 
  - destroying subscriptions 
  - tearing down third party apps

</v-clicks>

</div>
<div>
<a href="https://vuejs.org/assets/lifecycle.16e4c08e.png" target="_blank">
<img src="https://vuejs.org/assets/lifecycle.16e4c08e.png" class="h-[400px] w-auto" />
</a>
</div>
</div>

<!-- most used cycles hooks 
mounted -> access to some dom or adding a listener  
tearing down 
 data fetching? created setup -->



---
layout: default
---

# Slots

|     |     |
| --- | --- |
| Slot | Default |
| Name slots | custom titles |
| Slot props/Renderless Components/Scoped Slots  | Letting the parent take over |


<br />
<br />

<v-click>

### ➡️ Let's look at some code 

</v-click>


<div grid="~ cols-2 gap-2" m="-t-2">
<!-- <slot /> -->
<!-- named slots -->
<!-- prop slots -->
</div> 




---
layout: default
---

# Composables (hooks)

The best way to share stateful logic between components

#### The problem
<div grid="~ cols-3 gap-2" m="-t-2">


<div class="col-span-2">

```vue {all|12-13}
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

<template>Mouse position is at: {{ x }}, {{ y }}</template>
```

</div>
<div>
  <BasicMouse />
</div>
<!-- useFetch -->
<!-- useEvent -->
<!-- global -->
</div> 

---
layout: default
level: 2
---

# Composables - `useMouse` Refactor

by convention, composable function names start with "use"
<div grid="~ cols-2 gap-2" m="-t-2">

`useMouse`

Using the hook

<div>

```js {all}
export function useMouse() {
  const x = ref(0)
  const y = ref(0)

  function update(event) {
    x.value = event.pageX
    y.value = event.pageY
  }

  onMounted(() => window.addEventListener('mousemove', update))
  onUnmounted(() => window.removeEventListener('mousemove', update))

  return { x, y }
}
```

</div>
<div>

```vue {all}
<script setup>
import { useMouse } from './mouse.js'

const { x, y } = useMouse()
</script>

<template>Mouse position is at: {{ x }}, {{ y }}</template>
```

<BasicMouse />

</div>

<!-- useFetch -->
<!-- useEvent -->
<!-- global -->
</div> 

---
level: 2
---

# Composables - `useEventListener` Refactor

<div grid="~ cols-**2** gap-2" m="-t-2">

`useEventListener`

Using the hook (from another hook)

<div>

```js {all}
export function useEventListener(target, event, callback) { 
  onMounted(() => target.addEventListener(event, callback))
  onUnmounted(() => target.removeEventListener(event, callback))
}
```

```ts {all}
export function useMouse() {
  const x = ref(0)
  const y = ref(0)

  useEventListener(window, 'mousemove', (event) => {
    x.value = event.pageX
    y.value = event.pageY
  })

  return { x, y }
}
```

</div>
<div>



```vue {all}
<script setup>
import { useMouse } from './mouse.js'

const { x, y } = useMouse()
</script>

<template>Mouse position is at: {{ x }}, {{ y }}</template>
```

<BasicMouse />

</div>

<!-- useFetch -->
<!-- useEvent -->
<!-- global -->
</div> 

---

# Patterns & best practices

<v-clicks>

- Scoped slots vs Directives vs Composables
  - `v-click-outside` vs `<ClickOutside></ClickOutside>`
  - useFetch vs `<FetchData></FetchData>`
-  Components
   - Wrapper Components (v-btn -> app-btn)
   - Third party libs
- Conventions
  - naming
  - Separation of concerns 

</v-clicks>

<!-- 

With the mouse tracking example, as you can see you can inter mix how you approach some of Vue's unique offerings 
Scoped slots vs directives vs composables

click-outside vs <ClickOutside></ClickOutside>

 -->

---
level: 2
---
# Patterns

- Passing Refs as Arguments
<!-- - Make it flexible -->
- Objects of refs
- Side-effects self cleanup
- Shared State (client)
- Shared State (srr)

---

# Testing

<div grid="~ cols-2 gap-2" m="-t-2">

Unit Tests: Vitest or Jest 

e2e: Cypress or Playwright

<div>


### Do
- use test ids 
- assert on UI

Don't 
- assert on state

</div>
<div>

### Do
- Validate journeys 

Becareful 
- over mocking
- snapshots

</div>

</div> 

---

# Common libs

<v-clicks>
  
  - Inertia -> laravel router
  - Tanstack -> really great data fetching lib
  - Router -> indespensable
  - Pinia -> indespensable
  - Vueuse -> resource for hooks
  - Starting points
    - enterprise scaffold
    - create-vue
    - nuxt
</v-clicks>

---

# Recap

<v-clicks>
  
  - Explored the reactivity primitives (Ref, Computed, Watcher)
  - Touched on passing state (Props & emits)
  - Reviewed directives
  - Highlighted the important pieces of the life cycle hooks
  - Dove into Slots
  - Composition and Composables
  - Discussed Patterns and Practices 
    - Wrapper Components
    - Integrating with third party libs
    - Dashboard Views

</v-clicks>

---
hideInToc: true
layout: intro
---

#  The end 💤💤💤
