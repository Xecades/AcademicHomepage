<script setup lang="ts">
import RichText from "@/components/RichText.vue";

import type { NewsItem } from "@/types/site";

defineProps<{
    items: NewsItem[];
    scrollable?: boolean;
}>();
</script>

<template>
    <div class="news">
        <div class="table-responsive" :class="{ scrollable }">
            <table class="table table-sm table-borderless">
                <tbody>
                    <tr v-for="(item, index) in items" :key="`${item.dateLabel}-${index}`">
                        <th scope="row">{{ item.dateLabel }}</th>
                        <td><RichText :nodes="item.content" /></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
