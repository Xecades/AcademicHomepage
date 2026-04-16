<script setup lang="ts">
import PublicationItem from "@/components/PublicationItem.vue";

import type { Publication } from "@/types/site";

defineProps<{
    items: Publication[];
}>();
</script>

<template>
    <div class="pub-list space-y-8">
        <ol class="space-y-7">
            <PublicationItem
                v-for="publication in items"
                :key="publication.id"
                :publication="publication"
            />
        </ol>
    </div>
</template>
