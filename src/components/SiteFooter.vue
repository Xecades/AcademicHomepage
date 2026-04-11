<script setup lang="ts">
import RichText from "@/components/RichText.vue";
import { profile } from "@/data/site";
</script>

<template>
    <footer class="fixed-bottom" role="contentinfo">
        <RichText class="container mt-0" :nodes="profile.footer" tag="div" />
    </footer>
</template>
