<script setup lang="ts">
import RichText from "@/components/RichText.vue";

import type { Publication } from "@/types/site";

defineProps<{
    publication: Publication;
}>();
</script>

<template>
    <li class="mb-4">
        <div class="row flex gap-5 max-[576px]:flex-col">
            <div class="w-[30%] min-w-[170px] max-[576px]:w-full">
                <figure class="m-0">
                    <img
                        :src="publication.preview"
                        class="block max-w-full rounded"
                        :alt="publication.title"
                        loading="eager"
                    />
                </figure>
            </div>

            <div :id="publication.id" class="w-[70%] max-[576px]:w-full">
                <div class="font-bold">{{ publication.title }}</div>
                <RichText class="author" :nodes="publication.authors" />
                <RichText class="periodical" :nodes="publication.venue" />
                <div class="mt-[0.45rem]">
                    <a
                        v-for="link in publication.links"
                        :key="link.label"
                        :href="link.url"
                        class="mr-[0.35rem] rounded-[0.2rem] border border-[var(--global-text-color)] px-4 py-[0.24rem] text-[0.8rem] leading-[1.2] text-[var(--global-text-color)] hover:border-[var(--global-theme-color)] hover:text-[var(--global-theme-color)] hover:no-underline"
                        target="_blank"
                        rel="noopener"
                    >
                        {{ link.label }}
                    </a>
                </div>
            </div>
        </div>
    </li>
</template>

<style scoped>
.author :deep(a) {
    border-bottom: 1px dashed var(--global-theme-color);
}

.author :deep(a:hover) {
    border-bottom-style: solid;
    text-decoration: none;
}

.author :deep(em) {
    border-bottom: 1px solid;
    font-style: normal;
}
</style>
