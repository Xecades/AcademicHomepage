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
    <div class="mt-8">
        <template v-if="showYearHeadings">
            <template v-for="group in grouped" :key="group.year">
                <h2
                    class="mt-8 border-t border-[var(--global-divider-color)] pt-4 text-right text-[2rem] text-[var(--global-divider-color)]"
                >
                    {{ group.year }}
                </h2>
                <ol class="mt-0 list-none p-0">
                    <PublicationItem
                        v-for="publication in group.items"
                        :key="publication.id"
                        :publication="publication"
                    />
                </ol>
            </template>
        </template>

        <ol v-else class="mt-0 list-none p-0">
            <PublicationItem
                v-for="publication in list"
                :key="publication.id"
                :publication="publication"
            />
        </ol>
    </div>
</template>
