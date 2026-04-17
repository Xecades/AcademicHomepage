<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";

import type { ImagePair } from "@/types/site";

const props = defineProps<{
    imagePairs: ImagePair[];
    open: boolean;
    index: number;
}>();

const emit = defineEmits<{
    (event: "close"): void;
    (event: "update:index", nextIndex: number): void;
}>();

const loadedHighRes = ref<boolean[]>([]);
const highResSources = ref<Array<string | null>>([]);

watch(
    () => props.imagePairs,
    (pairs) => {
        loadedHighRes.value = pairs.map(() => false);
        highResSources.value = pairs.map(() => null);
    },
    { immediate: true },
);

const ensureHighResLoaded = (index: number) => {
    const pair = props.imagePairs[index];
    if (!pair || highResSources.value[index]) {
        return;
    }

    highResSources.value[index] = pair[1];
};

watch(
    () => props.open,
    (isOpen) => {
        document.body.style.overflow = isOpen ? "hidden" : "";

        if (isOpen) {
            ensureHighResLoaded(props.index);
        }
    },
    { immediate: true },
);

watch(
    () => props.index,
    (index) => {
        if (!props.open) {
            return;
        }

        ensureHighResLoaded(index);
    },
);

onBeforeUnmount(() => {
    document.body.style.overflow = "";
});

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
    loadedHighRes.value[index] = true;
};

const onKeyDown = (event: KeyboardEvent) => {
    if (!props.open) {
        return;
    }

    if (event.key === "Escape") {
        emit("close");
        return;
    }

    if (event.key === "ArrowLeft") {
        go(props.index - 1);
        return;
    }

    if (event.key === "ArrowRight") {
        go(props.index + 1);
    }
};

onMounted(() => {
    window.addEventListener("keydown", onKeyDown);
});

onBeforeUnmount(() => {
    window.removeEventListener("keydown", onKeyDown);
});
</script>

<template>
    <Teleport to="body">
        <div class="lightbox" :class="{ open }" @click.self="emit('close')">
            <button
                type="button"
                class="lb-close"
                aria-label="Close lightbox"
                @click="emit('close')"
            >
                <FontAwesomeIcon icon="fa-solid fa-xmark" />
            </button>

            <button
                type="button"
                class="lb-arrow lb-arrow-prev"
                aria-label="Previous image"
                @click.stop="go(index - 1)"
            >
                <FontAwesomeIcon icon="fa-solid fa-chevron-left" />
            </button>

            <div class="lb-stage" @click="emit('close')">
                <div class="lb-track" :style="trackStyle">
                    <div
                        v-for="(pair, itemIndex) in imagePairs"
                        :key="`${pair[1]}-${itemIndex}`"
                        class="lb-slide"
                    >
                        <img
                            v-if="highResSources[itemIndex]"
                            :src="highResSources[itemIndex]"
                            alt="Calligraphy work"
                            loading="lazy"
                            :class="{ loaded: loadedHighRes[itemIndex] }"
                            @load="markLoaded(itemIndex)"
                        />
                        <div class="lb-skeleton" :class="{ hidden: loadedHighRes[itemIndex] }" />
                    </div>
                </div>
            </div>

            <button
                type="button"
                class="lb-arrow lb-arrow-next"
                aria-label="Next image"
                @click.stop="go(index + 1)"
            >
                <FontAwesomeIcon icon="fa-solid fa-chevron-right" />
            </button>
        </div>
    </Teleport>
</template>

<style scoped>
.lightbox {
    position: fixed;
    inset: 0;
    background: rgb(10 10 11 / 90%);
    z-index: 1000;
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transition:
        opacity var(--calligraphy-motion-duration, 220ms) var(--calligraphy-motion-ease, ease),
        visibility 0s linear var(--calligraphy-motion-duration, 220ms);
}

.lightbox.open {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
    transition:
        opacity var(--calligraphy-motion-duration, 220ms) var(--calligraphy-motion-ease, ease),
        visibility 0s linear 0s;
}

.lb-close {
    position: absolute;
    top: 18px;
    right: 22px;
    border: 0;
    background: none;
    color: #ddd;
    font-size: 20px;
    cursor: pointer;
    transition: color 150ms ease;
    z-index: 20;
}

.lb-close:hover {
    color: #fff;
}

.lb-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 44px;
    height: 44px;
    border-radius: 9999px;
    border: 1px solid rgb(204 204 204 / 24%);
    background: rgb(185 185 185 / 12%);
    color: #ddd;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 150ms ease;
    z-index: 20;
    font-size: 16px;
}

.lb-arrow:hover {
    background: rgb(225 225 225 / 22%);
}

.lb-arrow-prev {
    left: 20px;
}

.lb-arrow-next {
    right: 20px;
}

.lb-stage {
    position: absolute;
    inset: 0;
    overflow: hidden;
    cursor: zoom-out;
}

.lb-track {
    display: flex;
    width: 100%;
    height: 100%;
    transition: transform 380ms cubic-bezier(0.4, 0, 0.2, 1);
}

.lb-slide {
    width: 100%;
    height: 100%;
    flex: 0 0 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 48px 80px;
}

.lb-slide img {
    object-fit: contain;
    border-radius: 3px;
    box-shadow: 0 8px 40px rgba(0, 0, 0, 0.6);
    opacity: 0;
    transition: opacity 300ms ease;
    display: block;
}

.lb-slide img.loaded {
    opacity: 1;
}

.lb-skeleton {
    position: absolute;
    inset: 48px 80px;
    background: linear-gradient(90deg, #2d2f33 25%, #3a3d42 50%, #2d2f33 75%);
    background-size: 200% 100%;
    animation: shimmer 1.4s infinite;
    border-radius: 6px;
}

.lb-skeleton.hidden {
    display: none;
}

@media (max-width: 768px) {
    .lb-slide {
        padding: 60px 16px;
    }

    .lb-skeleton {
        inset: 60px 16px;
    }

    .lb-arrow {
        width: 36px;
        height: 36px;
    }

    .lb-arrow-prev {
        left: 8px;
    }

    .lb-arrow-next {
        right: 8px;
    }
}

@keyframes shimmer {
    to {
        background-position: -200% 0;
    }
}
</style>
