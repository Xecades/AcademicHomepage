<script setup lang="ts">
import SiteFooter from "@/components/SiteFooter.vue";
</script>

<template>
    <main class="mx-auto w-full max-w-[930px] px-4 max-[576px]:px-3" role="main">
        <RouterView />
    </main>

    <SiteFooter />
</template>
