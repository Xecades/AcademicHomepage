<script setup lang="ts">
import RichText from "@/components/RichText.vue";

import type { Publication } from "@/types/site";

defineProps<{
    publication: Publication;
}>();
</script>

<template>
    <li>
        <div>
            <div>
                <figure>
                    <img :src="publication.preview" :alt="publication.title" loading="eager" />
                </figure>
            </div>

            <div :id="publication.id">
                <div>{{ publication.title }}</div>
                <RichText :nodes="publication.authors" />
                <RichText :nodes="publication.venue" />
                <div>
                    <a
                        v-for="link in publication.links"
                        :key="link.label"
                        :href="link.url"
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
