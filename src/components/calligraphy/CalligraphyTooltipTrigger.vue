<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";

import CalligraphyLightbox from "@/components/calligraphy/CalligraphyLightbox.vue";
import CalligraphyTooltipPanel from "@/components/calligraphy/CalligraphyTooltipPanel.vue";

import type { ImagePair } from "@/types/site";

const props = defineProps<{
    text: string;
    tooltipText: string;
    imagePairs: ImagePair[];
}>();

const anchorRef = ref<HTMLElement | null>(null);
const triggerRef = ref<HTMLButtonElement | null>(null);
const roundhandReady = ref(false);
const desktopEnabled = ref(
    typeof window !== "undefined" ? window.matchMedia("(min-width: 768px)").matches : false,
);
const visible = ref(false);
const activeIndex = ref(0);
const lightboxOpen = ref(false);
const arrowRight = ref(50);

let hideTimer: number | undefined;
let resizeObserver: ResizeObserver | undefined;
let desktopMediaQuery: MediaQueryList | undefined;

const roundhandFontDescriptor = '1em "Silhouette Roundhand"';

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

const syncDesktopState = (matches: boolean) => {
    desktopEnabled.value = matches;

    if (matches) {
        return;
    }

    clearHideTimer();
    releaseTooltipFocus();
    visible.value = false;
    lightboxOpen.value = false;
};

const onDesktopMediaChange = (event: MediaQueryListEvent) => {
    syncDesktopState(event.matches);
};

const showTooltip = () => {
    if (!desktopEnabled.value || !roundhandReady.value) {
        return;
    }

    clearHideTimer();

    visible.value = true;
};

const hideTooltip = () => {
    if (!desktopEnabled.value || !roundhandReady.value) {
        return;
    }

    clearHideTimer();

    hideTimer = window.setTimeout(() => {
        releaseTooltipFocus();
        visible.value = false;
    }, 220);
};

const openLightbox = (index: number) => {
    if (!desktopEnabled.value) {
        return;
    }

    clearHideTimer();
    releaseTooltipFocus();
    activeIndex.value = index;
    visible.value = false;
    lightboxOpen.value = true;
};

const closeLightbox = () => {
    lightboxOpen.value = false;
};

const ensureRoundhandFontReady = async () => {
    if (!("fonts" in document)) {
        roundhandReady.value = true;
        return;
    }

    const fontSet = document.fonts;

    if (fontSet.check(roundhandFontDescriptor)) {
        roundhandReady.value = true;
        updateArrowPosition();
        return;
    }

    try {
        await fontSet.load(roundhandFontDescriptor, props.text);
        await fontSet.ready;
    } catch {
        return;
    }

    if (!fontSet.check(roundhandFontDescriptor)) {
        return;
    }

    roundhandReady.value = true;
    updateArrowPosition();
};

onMounted(() => {
    void ensureRoundhandFontReady();
    updateArrowPosition();

    desktopMediaQuery = window.matchMedia("(min-width: 768px)");
    syncDesktopState(desktopMediaQuery.matches);

    if (typeof desktopMediaQuery.addEventListener === "function") {
        desktopMediaQuery.addEventListener("change", onDesktopMediaChange);
    } else {
        desktopMediaQuery.addListener(onDesktopMediaChange);
    }

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

    if (desktopMediaQuery) {
        if (typeof desktopMediaQuery.removeEventListener === "function") {
            desktopMediaQuery.removeEventListener("change", onDesktopMediaChange);
        } else {
            desktopMediaQuery.removeListener(onDesktopMediaChange);
        }
    }

    resizeObserver?.disconnect();
    window.removeEventListener("resize", updateArrowPosition);
});
</script>

<template>
    <div
        ref="anchorRef"
        class="ornament-anchor"
        :class="{ 'font-ready': roundhandReady }"
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
            v-if="desktopEnabled"
            :visible="visible"
            :tooltip-text="tooltipText"
            :image-pairs="imagePairs"
            :arrow-right="arrowRight"
            :index="activeIndex"
            @update:index="activeIndex = $event"
            @open="openLightbox"
        />

        <CalligraphyLightbox
            v-if="desktopEnabled"
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
    --calligraphy-tooltip-padding-x: 18px;
    --calligraphy-tooltip-padding-top: 18px;
    --calligraphy-tooltip-padding-bottom: 14px;
    --calligraphy-tooltip-carousel-height: 300px;
    --calligraphy-motion-duration: 220ms;
    --calligraphy-motion-ease: cubic-bezier(0.4, 0, 0.2, 1);

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

    .ornament-anchor:not(.font-ready) {
        opacity: 0;
        pointer-events: none;
        visibility: hidden !important;
    }

    .ornament-anchor.font-ready {
        opacity: 1;
        pointer-events: auto;
        visibility: visible;
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
    cursor: pointer;
}

.ornament-anchor:hover .ornament-trigger,
.ornament-anchor:focus-within .ornament-trigger {
    color: #333;
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
