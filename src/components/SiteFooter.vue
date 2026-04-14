<script setup lang="ts">
import RichText from "@/components/RichText.vue";
import { profile } from "@/data/site";
</script>

<template>
    <footer role="contentinfo">
        <RichText :nodes="profile.footer" tag="div" />
    </footer>
</template>
