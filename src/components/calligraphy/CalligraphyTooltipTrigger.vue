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
