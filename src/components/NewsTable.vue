<script setup lang="ts">
import RichText from "@/components/RichText.vue";

import type { NewsItem } from "@/types/site";

defineProps<{
    items: NewsItem[];
    scrollable?: boolean;
}>();
</script>

<template>
    <div>
        <div class="overflow-x-auto" :class="{ 'max-h-[60vw] overflow-y-auto': scrollable }">
            <table class="w-full border-collapse">
                <tbody>
                    <tr v-for="(item, index) in items" :key="`${item.dateLabel}-${index}`">
                        <th
                            scope="row"
                            class="w-1/5 px-0 py-px pr-4 text-left align-top text-base font-bold max-[576px]:w-[30%]"
                        >
                            {{ item.dateLabel }}
                        </th>
                        <td class="px-0 py-px pr-4 text-left align-top text-base">
                            <RichText :nodes="item.content" />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
