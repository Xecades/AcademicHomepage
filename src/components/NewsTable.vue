<script setup lang="ts">
import RichText from "@/components/RichText.vue";

import type { NewsItem } from "@/types/site";

defineProps<{
    items: NewsItem[];
    scrollable?: boolean;
}>();
</script>

<template>
    <div class="news-table overflow-hidden rounded-sm border border-zinc-300/70 bg-white/75">
        <div :class="{ 'max-h-[20rem] overflow-y-auto': scrollable }">
            <table class="w-full text-left text-[0.95rem] leading-7 text-zinc-700">
                <tbody class="divide-y divide-zinc-200/75">
                    <tr
                        v-for="(item, index) in items"
                        :key="`${item.dateLabel}-${index}`"
                        class="align-top"
                    >
                        <th
                            scope="row"
                            class="w-[8.5rem] px-4 py-3 text-xs font-normal uppercase tracking-[0.12em] text-zinc-500 md:px-5"
                        >
                            {{ item.dateLabel }}
                        </th>
                        <td class="px-4 py-3 md:px-5">
                            <RichText :nodes="item.content" />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
