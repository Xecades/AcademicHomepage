<script setup lang="ts">
import NewsTable from "@/components/NewsTable.vue";
import PublicationList from "@/components/PublicationList.vue";
import RichText from "@/components/RichText.vue";
import { news, profile, publications } from "@/data/site";
</script>

<template>
    <div>
        <header>
            <h1>
                <span>{{ profile.firstName }}</span> {{ profile.lastName }}
            </h1>
            <RichText :nodes="profile.subtitle" tag="p" />
        </header>

        <article>
            <div>
                <figure>
                    <img :src="profile.avatar" />
                </figure>
            </div>

            <div>
                <RichText v-for="(text, index) in profile.bio" :key="index" :nodes="text" tag="p" />
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

            <h2>news</h2>
            <NewsTable :items="news" scrollable />

            <h2>research</h2>
            <PublicationList :items="publications" :show-year-headings="false" />
        </article>
    </div>
</template>
