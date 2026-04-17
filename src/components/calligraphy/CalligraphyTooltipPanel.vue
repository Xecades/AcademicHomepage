<script setup lang="ts">
import { computed, type CSSProperties } from "vue";

import CalligraphyImageCarousel from "@/components/calligraphy/CalligraphyImageCarousel.vue";

import type { ImagePair } from "@/types/site";

const props = defineProps<{
    visible: boolean;
    tooltipText: string;
    imagePairs: ImagePair[];
    arrowRight: number;
    index: number;
}>();

const emit = defineEmits<{
    (event: "update:index", nextIndex: number): void;
    (event: "open", index: number): void;
}>();

const tooltipStyle = computed<CSSProperties>(() => ({
    "--arrow-right": `${props.arrowRight}px`,
}));
</script>

<template>
    <div
        class="tooltip bg-[#fdfefe] border border-zinc-300/70 rounded-sm"
        :class="{ visible }"
        :style="tooltipStyle"
        role="dialog"
        aria-label="Calligraphy gallery tooltip"
        :inert="!visible"
    >
        <p class="tooltip-text">{{ tooltipText }}</p>

        <CalligraphyImageCarousel
            :image-pairs="imagePairs"
            :index="index"
            :active="visible"
            @update:index="emit('update:index', $event)"
            @open="emit('open', $event)"
        />
    </div>
</template>

<style scoped>
.tooltip {
    position: absolute;
    top: calc(100% + var(--calligraphy-tooltip-gap, 14px));
    right: 0;
    width: var(--calligraphy-tooltip-width, min(340px, 82vw));
    box-shadow: 0 0px 7px 0px rgb(171 174 178 / 16%);
    padding: var(--calligraphy-tooltip-padding-top, 18px) var(--calligraphy-tooltip-padding-x, 18px)
        var(--calligraphy-tooltip-padding-bottom, 14px);
    opacity: 0;
    visibility: hidden;
    transform: translateY(6px);
    pointer-events: none;
    transition:
        opacity var(--calligraphy-motion-duration, 220ms) var(--calligraphy-motion-ease, ease),
        transform var(--calligraphy-motion-duration, 220ms) var(--calligraphy-motion-ease, ease),
        visibility 0s linear var(--calligraphy-motion-duration, 220ms);
    z-index: 100;
}

.tooltip.visible {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
    pointer-events: all;
    transition:
        opacity var(--calligraphy-motion-duration, 220ms) var(--calligraphy-motion-ease, ease),
        transform var(--calligraphy-motion-duration, 220ms) var(--calligraphy-motion-ease, ease),
        visibility 0s linear 0s;
}

.tooltip::after {
    content: "";
    position: absolute;
    bottom: 100%;
    right: var(--arrow-right, 50px);
    transform: translateX(50%) translateY(1px);
    border: 8px solid transparent;
    border-bottom-color: #ffffff;
}

.tooltip::before {
    content: "";
    position: absolute;
    bottom: 100%;
    right: var(--arrow-right, 50px);
    transform: translateX(50%);
    border: 9px solid transparent;
    border-bottom-color: #e2e4e7;
    filter: drop-shadow(0 4px 10px rgb(129 132 136 / 8%));
}

.tooltip-text {
    margin: 0 0 13px;
    font-size: 14px;
    line-height: 1.5;
}
</style>
