<script setup>
import FetchData from './FetchData.vue'
</script>
<template>
    <FetchData url="https://api.github.com/orgs/vuejs/repos" v-slot="{ loading, data: repos }">
        <div v-if="loading">Loading repositories...</div>
        <div v-else>
            <div
                v-for="repo in repos.slice(0, 2)"
                class="shadow-md p-3 mb-6 rounded bg-gray-950"
                :key="repo.full_name"
            >
                <div class="flex justify-between">
                    <a :href="repo.html_url">
                        <h3>{{ repo.full_name }}</h3>
                    </a>
                    <div class="flex items-center">
                        ⭐
                        {{ repo.stargazers_count }}
                    </div>
                </div>

                <div>
                    <p class="">Top Contributors</p>

                    <FetchData
                        :url="repo.contributors_url"
                        v-slot="{ loading, data: contributors }"
                    >
                        <div>
                            <div v-if="loading">Loading contributors...</div>

                            <div v-else>
                                <div
                                    v-for="contributor in contributors.slice(0, 5)"
                                    :key="contributor.avatar_url"
                                    class="inline-flex items-center mr-6"
                                >
                                    <span class="mr-1">
                                        <img
                                            :src="contributor.avatar_url"
                                            class="h-4 w-auto rounded-full"
                                            alt=""
                                        />
                                    </span>
                                    <a :href="contributor.html_url">{{ contributor.login }}</a>
                                </div>
                            </div>
                        </div>
                    </FetchData>
                </div>
            </div>
        </div>
    </FetchData>
</template>
