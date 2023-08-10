<script lang="ts" setup>
import IconCommunity from '@/components/icons/IconCommunity.vue'
import TheHeader from './TheHeader.vue'
import AppLayout from './AppLayout.vue'
import ExampleLayout from '@/components/ExampleLayout.vue'
import MouseTracker from './MouseTracker.vue'
import AppCard from './AppCard.vue'
import RepoList from './RepoList.vue'
</script>

<template>
    <ExampleLayout>
        <div class="p-6">
            <h1>Simple slots</h1>
            <TheHeader color="yellow">
                <span class="inline-flex items-center">
                    <IconCommunity class="mr-2" />
                    Hey there
                </span>
            </TheHeader>

            <AppCard>
                <template #image>
                    <img
                        src="https://images.unsplash.com/photo-1495835788122-ca48931258be?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=acc48b0187b28f7a221362b843f15755&auto=format&fit=crop&w=3450&q=80"
                        alt=""
                    />
                </template>
                <template v-slot:heading>
                    The Long Road to Mastering the Perfect Cartwheel
                </template>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia eos
                    accusantium minima architecto natus sequi quisquam incidunt dolorem, adipisci
                    accusamus facere dicta magni, qui consectetur, omnis quis, voluptas tempore quo!
                </p>
            </AppCard>
        </div>
        <div class="max-h-[100vh] min-h-[900px] p-6">
            <h1>Layout Slots</h1>
            <AppLayout>
                <template v-slot:sidebar> Aside </template>
                <template #main> Main content </template>
                <template v-slot:footer> Footer </template>
            </AppLayout>
        </div>
        <div class="p-6">
            <h1>Scoped Slots</h1>
            <div>
                <h2>Based concept</h2>
                <MouseTracker v-slot="{ x, y }"> Mouse is at: {{ x }}, {{ y }} </MouseTracker>
            </div>
            <div>
                <h2>Renderless Components</h2>
                <RepoList></RepoList>
                <!-- <FetchData></FetchData> -->
            </div>
        </div>
    </ExampleLayout>
</template>
