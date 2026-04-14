<script setup lang="ts">
import RichText from "@/components/RichText.vue";

import type { Publication } from "@/types/site";

defineProps<{
    publication: Publication;
}>();
</script>

<template>
    <li class="group">
        <div class="grid gap-5 md:grid-cols-[138px_1fr] md:gap-7">
            <div>
                <figure class="overflow-hidden rounded-sm border border-zinc-300/70 bg-zinc-100/70">
                    <img
                        :src="publication.preview"
                        :alt="publication.title"
                        loading="eager"
                        class="aspect-[4/3] h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.015]"
                    />
                </figure>
            </div>

            <div :id="publication.id" class="space-y-2">
                <div class="text-[1.06rem] leading-7 text-zinc-900">{{ publication.title }}</div>
                <RichText :nodes="publication.authors" class="leading-7 text-zinc-700" />
                <RichText
                    :nodes="publication.venue"
                    class="text-sm italic leading-6 text-zinc-500"
                />
                <div class="flex flex-wrap gap-2 pt-1">
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
