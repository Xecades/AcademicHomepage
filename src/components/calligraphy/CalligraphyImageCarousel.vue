<script setup lang="ts">
import { computed, ref, watch } from "vue";

import type { ImagePair } from "@/types/site";

const props = defineProps<{
    imagePairs: ImagePair[];
    index: number;
}>();

const emit = defineEmits<{
    (event: "update:index", nextIndex: number): void;
    (event: "open", index: number): void;
}>();

const loadedLowRes = ref<boolean[]>([]);

watch(
    () => props.imagePairs,
    (pairs) => {
        loadedLowRes.value = pairs.map(() => false);
    },
    { immediate: true },
);

const total = computed(() => props.imagePairs.length);
const trackStyle = computed(() => ({
    transform: `translateX(-${props.index * 100}%)`,
}));

const go = (next: number) => {
    if (total.value === 0) {
        return;
    }

    const normalized = (next + total.value) % total.value;
    emit("update:index", normalized);
};

const markLoaded = (index: number) => {
    loadedLowRes.value[index] = true;
};
</script>

<template>
    <div class="carousel">
        <div class="slides-track" :style="trackStyle">
            <button
                v-for="(pair, itemIndex) in imagePairs"
                :key="`${pair[0]}-${itemIndex}`"
                type="button"
                class="slide"
                :aria-label="`Open image ${itemIndex + 1} in lightbox`"
                @click="emit('open', itemIndex)"
            >
                <img
                    :src="pair[0]"
                    alt="Calligraphy preview"
                    loading="lazy"
                    :class="{ loaded: loadedLowRes[itemIndex] }"
                    @load="markLoaded(itemIndex)"
                />
                <div class="slide-skeleton" :class="{ hidden: loadedLowRes[itemIndex] }" />
            </button>
        </div>

        <button
            type="button"
            class="arrow arrow-prev"
            aria-label="Previous image"
            @click.stop="go(index - 1)"
        >
            <FontAwesomeIcon icon="fa-solid fa-chevron-left" />
        </button>
        <button
            type="button"
            class="arrow arrow-next"
            aria-label="Next image"
            @click.stop="go(index + 1)"
        >
            <FontAwesomeIcon icon="fa-solid fa-chevron-right" />
        </button>

        <div class="dots" role="tablist" aria-label="Calligraphy image navigation">
            <button
                v-for="(_, dotIndex) in imagePairs"
                :key="`dot-${dotIndex}`"
                type="button"
                class="dot"
                :class="{ active: dotIndex === index }"
                :aria-label="`Go to image ${dotIndex + 1}`"
                :aria-current="dotIndex === index ? 'true' : 'false'"
                @click.stop="go(dotIndex)"
            />
        </div>
    </div>
</template>

<style scoped>
.carousel {
    position: relative;
    height: var(--calligraphy-tooltip-carousel-height, 210px);
    overflow: hidden;
    cursor: pointer;
}

.slides-track {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    width: 100%;
    height: 100%;
    transition: transform 380ms cubic-bezier(0.4, 0, 0.2, 1);
}

.slide {
    height: 100%;
    width: 100%;
    flex: 0 0 100%;
    position: relative;
    border: 0;
    background: transparent;
    padding: 0;
    cursor: pointer;
}

.slide img {
    max-width: 100%;
    max-height: 100%;
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    opacity: 0;
    transition: opacity 300ms ease;
}

.slide img.loaded {
    opacity: 1;
}

.slide-skeleton {
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, #dee8f3 25%, #edf3fa 50%, #dee8f3 75%);
    background-size: 200% 100%;
    animation: shimmer 1.4s infinite;
}

.slide-skeleton.hidden {
    display: none;
}

.arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 30px;
    height: 30px;
    border: 0;
    border-radius: 9999px;
    background: rgba(255, 255, 255, 0.5);
    color: #353637;
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    opacity: 0;
    transition:
        opacity var(--calligraphy-motion-duration, 220ms) var(--calligraphy-motion-ease, ease),
        background 150ms ease;
    z-index: 10;
}

.carousel:hover .arrow,
.carousel:focus-within .arrow {
    opacity: 1;
}

.arrow:hover {
    background: #ffffff;
}

.arrow-prev {
    left: 8px;
}

.arrow-next {
    right: 8px;
}

.dots {
    position: absolute;
    bottom: 8px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 6px;
    z-index: 10;
}

.dot {
    width: 6px;
    height: 6px;
    border-radius: 9999px;
    background: rgb(232 232 232 / 72%);
    cursor: pointer;
    padding: 0;
    transition:
        background 200ms ease,
        transform 200ms ease;
}

.dot.active {
    background: #fff;
    transform: scale(1.3);
}

@keyframes shimmer {
    to {
        background-position: -200% 0;
    }
}
</style>
