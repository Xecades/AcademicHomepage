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
        class="tooltip"
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
    background: #fffdf9;
    border: 1px solid #e8dfc8;
    border-radius: var(--calligraphy-tooltip-radius, 12px);
    box-shadow:
        0 8px 36px rgba(26, 22, 18, 0.13),
        0 2px 8px rgba(26, 22, 18, 0.07);
    padding: var(--calligraphy-tooltip-padding-top, 18px) var(--calligraphy-tooltip-padding-x, 18px)
        var(--calligraphy-tooltip-padding-bottom, 14px);
    opacity: 0;
    visibility: hidden;
    transform: translateY(6px);
    pointer-events: none;
    transition:
        opacity 200ms ease,
        transform 200ms ease;
    z-index: 100;
}

.tooltip.visible {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
    pointer-events: all;
}

.tooltip::after {
    content: "";
    position: absolute;
    bottom: 100%;
    right: var(--arrow-right, 50px);
    transform: translateX(50%);
    border: 8px solid transparent;
    border-bottom-color: #fffdf9;
}

.tooltip::before {
    content: "";
    position: absolute;
    top: 100%;
    right: var(--arrow-right, 50px);
    transform: translateX(50%);
    border: 9px solid transparent;
    border-top-color: #e8dfc8;
    margin-top: 1px;
    z-index: -1;
}

.tooltip-text {
    margin: 0 0 var(--calligraphy-tooltip-text-gap, 13px);
    font-size: 13.5px;
    line-height: 1.5;
    letter-spacing: 0.01em;
    color: #5c5040;
}
</style>
