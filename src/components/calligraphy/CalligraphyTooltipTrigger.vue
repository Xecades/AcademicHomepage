<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";

import CalligraphyLightbox from "@/components/calligraphy/CalligraphyLightbox.vue";
import CalligraphyTooltipPanel from "@/components/calligraphy/CalligraphyTooltipPanel.vue";

import type { ImagePair } from "@/types/site";

defineProps<{
    text: string;
    tooltipText: string;
    imagePairs: ImagePair[];
}>();

const anchorRef = ref<HTMLElement | null>(null);
const triggerRef = ref<HTMLButtonElement | null>(null);
const visible = ref(false);
const activeIndex = ref(0);
const lightboxOpen = ref(false);
const arrowRight = ref(50);

let hideTimer: number | undefined;
let resizeObserver: ResizeObserver | undefined;

const clearHideTimer = () => {
    if (hideTimer !== undefined) {
        window.clearTimeout(hideTimer);
        hideTimer = undefined;
    }
};

const releaseTooltipFocus = () => {
    const activeElement = document.activeElement;
    if (!(activeElement instanceof HTMLElement)) {
        return;
    }

    if (anchorRef.value?.contains(activeElement)) {
        activeElement.blur();
    }
};

const updateArrowPosition = () => {
    const buttonWidth = triggerRef.value?.offsetWidth ?? 100;
    arrowRight.value = Math.round(buttonWidth / 2);
};

const showTooltip = () => {
    clearHideTimer();

    visible.value = true;
};

const hideTooltip = () => {
    clearHideTimer();

    hideTimer = window.setTimeout(() => {
        releaseTooltipFocus();
        visible.value = false;
    }, 220);
};

const openLightbox = (index: number) => {
    clearHideTimer();
    releaseTooltipFocus();
    activeIndex.value = index;
    visible.value = false;
    lightboxOpen.value = true;
};

const closeLightbox = () => {
    lightboxOpen.value = false;
};

onMounted(() => {
    updateArrowPosition();

    resizeObserver = new ResizeObserver(() => {
        updateArrowPosition();
    });

    if (triggerRef.value) {
        resizeObserver.observe(triggerRef.value);
    }

    window.addEventListener("resize", updateArrowPosition);
});

onBeforeUnmount(() => {
    clearHideTimer();

    resizeObserver?.disconnect();
    window.removeEventListener("resize", updateArrowPosition);
});
</script>

<template>
    <div
        ref="anchorRef"
        class="ornament-anchor"
        @mouseenter="showTooltip"
        @mouseleave="hideTooltip"
    >
        <button
            ref="triggerRef"
            type="button"
            class="ornament-trigger"
            aria-label="Open calligraphy tooltip"
        >
            {{ text }}
        </button>

        <div class="tooltip-bridge" :class="{ visible }" />

        <CalligraphyTooltipPanel
            :visible="visible"
            :tooltip-text="tooltipText"
            :image-pairs="imagePairs"
            :arrow-right="arrowRight"
            :index="activeIndex"
            @update:index="activeIndex = $event"
            @open="openLightbox"
        />

        <CalligraphyLightbox
            :open="lightboxOpen"
            :image-pairs="imagePairs"
            :index="activeIndex"
            @update:index="activeIndex = $event"
            @close="closeLightbox"
        />
    </div>
</template>

<style scoped>
.ornament-anchor {
    --calligraphy-tooltip-width: min(500px, 82vw);
    --calligraphy-tooltip-gap: 14px;
    --calligraphy-tooltip-bridge-height: 20px;
    --calligraphy-tooltip-radius: 12px;
    --calligraphy-tooltip-padding-x: 18px;
    --calligraphy-tooltip-padding-top: 18px;
    --calligraphy-tooltip-padding-bottom: 14px;
    --calligraphy-tooltip-carousel-height: 300px;
    --calligraphy-tooltip-text-gap: 13px;
    --calligraphy-motion-duration: 220ms;
    --calligraphy-motion-ease: cubic-bezier(0.4, 0, 0.2, 1);

    --calligraphy-tooltip-bg: #f4f8ff;
    --calligraphy-tooltip-border: #d6e2f1;
    --calligraphy-tooltip-text: #4f627b;
    --calligraphy-tooltip-shadow-strong: rgba(58, 84, 118, 0.16);
    --calligraphy-tooltip-shadow-soft: rgba(58, 84, 118, 0.08);

    --calligraphy-carousel-skeleton-start: #dee8f3;
    --calligraphy-carousel-skeleton-mid: #edf3fa;
    --calligraphy-carousel-skeleton-end: #dee8f3;
    --calligraphy-carousel-control-bg: rgba(240, 248, 255, 0.9);
    --calligraphy-carousel-control-bg-hover: #f7fbff;
    --calligraphy-carousel-control-color: #486280;
    --calligraphy-carousel-control-shadow: rgba(41, 63, 89, 0.14);
    --calligraphy-carousel-dot-bg: rgba(234, 244, 255, 0.72);
    --calligraphy-carousel-dot-border: rgba(106, 140, 177, 0.42);
    --calligraphy-carousel-dot-active: #7ea3cb;

    --calligraphy-lightbox-overlay: rgba(12, 24, 38, 0.9);
    --calligraphy-lightbox-control-color: #b6cde7;
    --calligraphy-lightbox-control-color-hover: #f0f7ff;
    --calligraphy-lightbox-control-border: rgba(168, 195, 224, 0.34);
    --calligraphy-lightbox-control-bg: rgba(214, 232, 251, 0.12);
    --calligraphy-lightbox-control-bg-hover: rgba(227, 242, 255, 0.22);
    --calligraphy-lightbox-skeleton-start: #243447;
    --calligraphy-lightbox-skeleton-mid: #324a65;
    --calligraphy-lightbox-skeleton-end: #243447;

    position: absolute;
    right: 1rem;
    top: -10px;
    display: none;
    white-space: nowrap;
    z-index: 30;
}

@media (min-width: 768px) {
    .ornament-anchor {
        display: inline-block;
    }
}

.ornament-trigger {
    border: 0;
    background: transparent;
    padding: 0;
    font-family: var(--roundhand-font-family);
    font-size: 6rem;
    line-height: 1;
    color: #6c7386;
    transition: color 200ms ease;
    cursor: default;
}

.ornament-anchor:hover .ornament-trigger,
.ornament-anchor:focus-within .ornament-trigger {
    color: #5a6072;
}

.tooltip-bridge {
    position: absolute;
    top: 100%;
    right: 0;
    width: var(--calligraphy-tooltip-width);
    height: var(--calligraphy-tooltip-bridge-height);
    z-index: 99;
    display: none;
}

.tooltip-bridge.visible {
    display: block;
}
</style>
