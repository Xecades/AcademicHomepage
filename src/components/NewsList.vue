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
        <div :class="{ 'max-h-80 overflow-y-auto': scrollable }">
            <table class="w-full text-left text-[0.95rem] leading-6 text-zinc-700">
                <tbody class="divide-y divide-zinc-200/75">
                    <tr
                        v-for="(item, index) in items"
                        :key="`${item.dateLabel}-${index}`"
                        class="align-top"
                    >
                        <th
                            scope="row"
                            class="w-34 whitespace-nowrap px-4 py-3 text-xs font-normal uppercase tracking-[0.12em] leading-6 text-zinc-500 md:px-5 sans-serif"
                        >
                            {{ item.dateLabel }}
                        </th>
                        <td class="px-4 py-3 align-top md:px-5">
                            <RichText :nodes="item.content" tag="p" class="m-0" />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
