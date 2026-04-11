<script setup lang="ts">
import RichText from "@/components/RichText.vue";
import { profile } from "@/data/site";
</script>

<template>
    <footer class="mt-8 bg-[var(--global-footer-bg-color)] text-xs" role="contentinfo">
        <RichText
            class="mx-auto w-full max-w-[930px] px-4 py-2 text-center text-[var(--global-footer-text-color)] max-[576px]:px-3"
            :nodes="profile.footer"
            tag="div"
        />
    </footer>
</template>

<style scoped>
.text-xs :deep(a) {
    color: var(--global-footer-link-color);
}

.text-xs :deep(a:hover) {
    color: var(--global-theme-color);
    text-decoration: none;
}
</style>
