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
        <div :class="{ 'max-h-[60vw] overflow-y-auto': scrollable }">
            <table>
                <tbody>
                    <tr v-for="(item, index) in items" :key="`${item.dateLabel}-${index}`">
                        <th scope="row">
                            {{ item.dateLabel }}
                        </th>
                        <td>
                            <RichText :nodes="item.content" />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
