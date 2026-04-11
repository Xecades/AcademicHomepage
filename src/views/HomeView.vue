<script setup lang="ts">
import NewsTable from "@/components/NewsTable.vue";
import PublicationList from "@/components/PublicationList.vue";
import RichText from "@/components/RichText.vue";
import { news, profile, publications } from "@/data/site";
</script>

<template>
    <div class="mb-10">
        <header>
            <h1 class="m-0 font-['Roboto_Slab'] text-[2.5rem]">
                <span class="font-bold">{{ profile.firstName }}</span> {{ profile.lastName }}
            </h1>
            <RichText
                class="mb-[1.2rem] mt-[0.4rem] text-[var(--global-text-color-light)]"
                :nodes="profile.subtitle"
                tag="p"
            />
        </header>

        <article>
            <div
                class="float-right ml-4 w-full min-[576px]:w-[30%] max-[576px]:mb-4 max-[576px]:ml-0 max-[576px]:float-none"
            >
                <figure>
                    <img class="block w-full rounded" :src="profile.avatar" alt="me.png" />
                </figure>
            </div>

            <div class="clear-both">
                <RichText
                    v-for="(text, index) in profile.bio"
                    :key="index"
                    :nodes="text"
                    tag="p"
                    class="mb-4 mt-0"
                />
                <p>
                    <a
                        v-for="(contact, index) in profile.contacts"
                        :key="contact.label"
                        :href="contact.url"
                        target="_blank"
                        rel="noopener"
                    >
                        {{ contact.label
                        }}<span v-if="index < profile.contacts.length - 1"> / </span>
                    </a>
                </p>
            </div>

            <h2 class="mb-4 mt-8 font-['Roboto_Slab'] text-[2rem] font-normal">news</h2>
            <NewsTable :items="news" scrollable />

            <h2 class="mb-4 mt-8 font-['Roboto_Slab'] text-[2rem] font-normal">research</h2>
            <PublicationList :items="publications" :show-year-headings="false" />
        </article>
    </div>
</template>
