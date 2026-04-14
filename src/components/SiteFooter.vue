<script setup lang="ts">
import RichText from "@/components/RichText.vue";
import { profile } from "@/data/site";
</script>

<template>
    <footer role="contentinfo" class="footer-note border-t border-zinc-300/70 bg-[#f5f5f2]/65">
        <div class="mx-auto max-w-5xl px-6 py-6 text-sm text-zinc-500 md:px-10">
            <RichText :nodes="profile.footer" tag="div" />
        </div>
    </footer>
</template>
