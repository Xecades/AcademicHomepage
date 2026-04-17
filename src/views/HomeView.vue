<script setup lang="ts">
import NewsList from "@/components/NewsList.vue";
import PublicationList from "@/components/PublicationList.vue";
import RichText from "@/components/RichText.vue";
import { experiences, news, profile, publications } from "@/assets/data/site";
import ExperienceList from "@/components/ExperienceList.vue";
import CalligraphyTooltipTrigger from "@/components/calligraphy/CalligraphyTooltipTrigger.vue";
</script>

<template>
    <div class="min-h-screen text-slate-700">
        <div class="mx-auto max-w-5xl px-6 pb-14 pt-12 md:px-16 md:pb-16 md:pt-16">
            <header class="border-b border-zinc-300/70 pb-8 md:pb-10 relative">
                <CalligraphyTooltipTrigger
                    :text="`${profile.firstName} ${profile.lastName}`"
                    :tooltip-text="profile.calligraphy.tooltipText"
                    :image-pairs="profile.calligraphy.imagePairs"
                />
                <h1
                    class="text-4xl font-[530] text-zinc-700 md:text-5xl font-(family-name:--header-font-family)"
                >
                    <span class="font-normal text-zinc-500">{{ profile.firstName }}</span>
                    {{ profile.lastName }}
                </h1>
                <RichText
                    :nodes="profile.subtitle"
                    tag="p"
                    class="hero-subtitle m-0 mt-2 max-w-2xl text-base leading-7 text-zinc-600 md:text-[1.05rem] sans-serif"
                />
            </header>

            <article class="space-y-10 pt-8 md:space-y-12 md:pt-10">
                <section
                    class="grid gap-7 md:grid-cols-[1fr_240px] md:items-start md:gap-9 md:mx-6"
                >
                    <figure
                        class="overflow-hidden rounded-sm border border-zinc-300/70 bg-zinc-100/80 shadow-[0_4px_12px_-10px_rgba(39,39,42,0.38)] md:order-2"
                    >
                        <img
                            :src="profile.avatar"
                            :alt="`${profile.firstName} ${profile.lastName}`"
                            class="aspect-3/4 h-full w-full object-cover"
                        />
                    </figure>

                    <div class="copy pt-1 md:order-1">
                        <RichText
                            v-for="(text, index) in profile.bio"
                            :key="index"
                            :nodes="text"
                            tag="p"
                            class="m-0 mb-4 leading-8 text-zinc-700 last:mb-0"
                        />
                        <p
                            class="mt-6 text-sm uppercase tracking-[0.12em] text-zinc-500 text-center sans-serif"
                        >
                            <template
                                v-for="(contact, index) in profile.contacts"
                                :key="contact.label"
                            >
                                <a
                                    :href="contact.url"
                                    target="_blank"
                                    rel="noopener"
                                    class="transition-colors duration-200 hover:text-zinc-900"
                                >
                                    {{ contact.label }}
                                </a>
                                <span v-if="index < profile.contacts.length - 1" aria-hidden="true">
                                    /
                                </span>
                            </template>
                        </p>
                    </div>
                </section>

                <section class="space-y-4">
                    <h2 class="section-title text-sm text-zinc-500">news</h2>
                    <NewsList :items="news" scrollable />
                </section>

                <section class="space-y-4">
                    <h2 class="section-title text-sm text-zinc-500">research</h2>
                    <p class="text-sm italic text-zinc-500">(* denotes equal contribution)</p>
                    <PublicationList :items="publications" />
                </section>

                <section class="space-y-4">
                    <h2 class="section-title text-sm text-zinc-500">Experience</h2>
                    <ExperienceList :items="experiences" />
                </section>
            </article>
        </div>
    </div>
</template>

<style scoped>
.section-title {
    letter-spacing: 0.12em;
    text-transform: uppercase;
}

.copy :deep(a),
.news-table :deep(a),
.pub-list :deep(a),
.experience-list :deep(a) {
    border-bottom: 1px solid color-mix(in srgb, #3f3f46 28%, transparent);
    color: #27272a;
    text-decoration: none;
    transition:
        border-color 200ms ease,
        color 200ms ease;
}

.copy :deep(strong) {
    color: #000;
}

.hero-subtitle :deep(a) {
    border-bottom: 1px solid transparent;
    color: #27272a;
    text-decoration: none;
    transition: border-color 200ms ease;
}

.copy :deep(a:hover),
.news-table :deep(a:hover),
.pub-list :deep(a:hover),
.experience-list :deep(a:hover),
.hero-subtitle :deep(a:hover) {
    border-bottom-color: color-mix(in srgb, #18181b 55%, transparent);
    color: #18181b;
}
</style>
