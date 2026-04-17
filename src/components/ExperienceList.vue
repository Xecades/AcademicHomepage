<script setup lang="ts">
import RichText from "@/components/RichText.vue";

import type { Experience } from "@/types/site";

defineProps<{
    items: Experience[];
}>();
</script>

<template>
    <ul class="experience-list space-y-4 py-3">
        <li
            v-for="experience in items"
            :key="experience.id"
            class="grid gap-3 md:grid-cols-[128px_1fr] md:gap-8"
        >
            <div class="items-start justify-start self-center">
                <img
                    :src="experience.logo"
                    alt="Institution logo"
                    class="h-20 w-20 object-contain md:h-32 md:w-32"
                />
            </div>
            <div class="space-y-1 self-center">
                <RichText
                    :nodes="experience.institution"
                    tag="strong"
                    class="m-0 text-[1.04rem] leading-7 text-zinc-900"
                />
                <RichText
                    :nodes="experience.periodLocation"
                    tag="p"
                    class="m-0 text-[0.95rem] leading-6 text-zinc-600"
                />
                <RichText
                    :nodes="experience.degree"
                    tag="p"
                    class="m-0 mb-5 text-[0.95rem] leading-6 text-zinc-700"
                />
                <RichText
                    :nodes="experience.advisors"
                    tag="p"
                    class="m-0 text-[0.95rem] leading-6 text-zinc-700"
                />
            </div>
        </li>
    </ul>
</template>
