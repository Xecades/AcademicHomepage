<script setup lang="ts">
import RichText from "@/components/RichText.vue";

import type { Publication } from "@/types/site";

defineProps<{
    publication: Publication;
}>();
</script>

<template>
    <li>
        <div class="grid gap-5 md:grid-cols-[350px_1fr] md:items-stretch md:gap-7">
            <div>
                <figure
                    class="overflow-hidden rounded-sm border border-zinc-300/80 bg-zinc-100/80 shadow-[0_14px_30px_-24px_rgba(24,24,27,0.7)]"
                >
                    <img
                        :src="publication.preview"
                        :alt="publication.title"
                        loading="eager"
                        class="aspect-2/1 h-full w-full object-cover"
                    />
                </figure>
            </div>

            <div :id="publication.id" class="-mt-1 flex h-full flex-col">
                <div class="text-[1.06rem] leading-7 text-zinc-800 font-semibold">
                    {{ publication.title }}
                </div>
                <RichText
                    :nodes="publication.authors"
                    tag="p"
                    class="author-line m-0 leading-7 text-zinc-700 text-[0.97rem] sans-serif"
                />
                <RichText
                    :nodes="publication.venue"
                    tag="p"
                    class="m-0 pt-0.5 text-sm italic leading-6 text-zinc-500 sans-serif"
                />
                <div class="mt-auto flex flex-wrap gap-2 pt-2">
                    <a
                        v-for="link in publication.links"
                        :key="link.label"
                        :href="link.url"
                        target="_blank"
                        rel="noopener"
                        class="inline-flex items-center rounded-sm border border-zinc-300/80 px-2.5 py-1 text-[0.72rem] uppercase tracking-[0.11em] text-zinc-600 transition-colors duration-200 hover:border-zinc-500 hover:text-zinc-900"
                    >
                        {{ link.label }}
                    </a>
                </div>
            </div>
        </div>
    </li>
</template>

<style scoped>
.author-line :deep(em) {
    color: #18181b;
    font-style: normal;
    font-weight: 600;
}
</style>
