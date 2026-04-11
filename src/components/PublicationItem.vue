<script setup lang="ts">
import RichText from "@/components/RichText.vue";

import type { Publication } from "@/types/site";

defineProps<{
    publication: Publication;
}>();
</script>

<template>
    <li>
        <div class="row publication-row">
            <div class="publication-media">
                <figure>
                    <img
                        :src="publication.preview"
                        class="preview rounded"
                        :alt="publication.title"
                        loading="eager"
                    />
                </figure>
            </div>

            <div :id="publication.id" class="publication-content">
                <div class="title">{{ publication.title }}</div>
                <RichText class="author" :nodes="publication.authors" />
                <RichText class="periodical" :nodes="publication.venue" />
                <div class="links">
                    <a
                        v-for="link in publication.links"
                        :key="link.label"
                        :href="link.url"
                        class="btn btn-sm"
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
