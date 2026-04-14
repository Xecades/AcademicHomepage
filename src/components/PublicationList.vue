<script setup lang="ts">
import { computed } from "vue";

import PublicationItem from "@/components/PublicationItem.vue";

import type { Publication } from "@/types/site";

const props = withDefaults(
    defineProps<{
        items: Publication[];
        showYearHeadings?: boolean;
    }>(),
    {
        showYearHeadings: true,
    },
);

const list = computed(() => props.items);

const grouped = computed(() => {
    const map = new Map<number, Publication[]>();

    for (const publication of list.value) {
        const group = map.get(publication.year) ?? [];
        group.push(publication);
        map.set(publication.year, group);
    }

    return [...map.entries()].sort((a, b) => b[0] - a[0]).map(([year, items]) => ({ year, items }));
});
</script>

<template>
    <div>
        <template v-if="showYearHeadings">
            <template v-for="group in grouped" :key="group.year">
                <h2>
                    {{ group.year }}
                </h2>
                <ol>
                    <PublicationItem
                        v-for="publication in group.items"
                        :key="publication.id"
                        :publication="publication"
                    />
                </ol>
            </template>
        </template>

        <ol v-else>
            <PublicationItem
                v-for="publication in list"
                :key="publication.id"
                :publication="publication"
            />
        </ol>
    </div>
</template>
