import ScrollReveal from "scrollreveal";
import { onBeforeUnmount, onMounted } from "vue";

type Options = scrollReveal.ScrollRevealObjectOptions;

interface RevealStep {
    step: number;
    delta: number;
    stagger?: number;
    options?: Options;
}

const DELTA = 20;

export const revealBaseConfig: Options = {
    cleanup: true,
    distance: "6px",
    duration: 400,
    interval: DELTA,
    easing: "cubic-bezier(0.22, 1, 0.36, 1)",
    opacity: 0,
    origin: "top",
    scale: 0.99,
};

export const revealTimeline: RevealStep[] = [
    { step: 1, delta: 0 }, // Title
    { step: 2, delta: DELTA }, // Subtitle
    { step: 3, delta: DELTA }, // Calligraphy
    { step: 4, delta: DELTA }, // Border line
    { step: 5, delta: DELTA }, // Bio
    { step: 6, delta: DELTA }, // Links
    { step: 7, delta: 0 }, // Picture
    { step: 8, delta: DELTA }, // News header
    { step: 9, delta: DELTA }, // News box
    { step: 10, delta: 0 }, // News items
    { step: 11, delta: DELTA }, // Research header
    { step: 12, delta: DELTA }, // Research image
    { step: 13, delta: DELTA }, // Research title
    { step: 14, delta: DELTA }, // Research authors
    { step: 15, delta: DELTA }, // Research venue
    { step: 16, delta: DELTA }, // Research links
    { step: 17, delta: DELTA }, // Experiences header
    { step: 18, delta: DELTA }, // Experiences items
];

const prefersReducedMotion = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const isInitiallyVisible = (element: Element) => {
    const rect = element.getBoundingClientRect();

    return rect.bottom > 0 && rect.top < window.innerHeight;
};

const mount = () => {
    const root = document.documentElement;

    if (prefersReducedMotion()) {
        root.classList.add("rv-no-motion");
        root.classList.remove("rv-pending");
        return;
    }

    root.classList.remove("rv-no-motion");

    try {
        const sr = ScrollReveal();
        let onloadDelay = 0;
        let offscreenDelay = 0;
        let hasOffscreenStep = false;

        for (const item of revealTimeline) {
            const selector = `.rv[data-rv-step="${item.step}"]`;
            const elements = Array.from(document.querySelectorAll<HTMLElement>(selector));

            if (elements.length === 0) {
                continue;
            }

            const stepStartsInViewport = elements.some(isInitiallyVisible);
            let stepDelay = 0;

            const stepOptions: Options = {
                ...revealBaseConfig,
                ...item.options,
            };

            const configuredInterval =
                typeof stepOptions.interval === "number" ? stepOptions.interval : undefined;
            const perElementDelay = item.stagger ?? configuredInterval ?? 72;
            const stepSpan = (elements.length - 1) * perElementDelay;

            const stepOptionsWithoutInterval: Options = { ...stepOptions };
            delete stepOptionsWithoutInterval.interval;

            if (stepStartsInViewport) {
                onloadDelay += item.delta;
                stepDelay = onloadDelay;

                elements.forEach((element, index) => {
                    sr.reveal(element, {
                        ...stepOptionsWithoutInterval,
                        delay: stepDelay + index * perElementDelay,
                    });
                });

                onloadDelay = stepDelay + stepSpan;
            } else {
                if (hasOffscreenStep) {
                    offscreenDelay += item.delta;
                    stepDelay = offscreenDelay;
                } else {
                    hasOffscreenStep = true;
                    stepDelay = 0;
                }

                elements.forEach((element, index) => {
                    sr.reveal(element, {
                        ...stepOptionsWithoutInterval,
                        delay: stepDelay + index * perElementDelay,
                    });
                });

                offscreenDelay = stepDelay + stepSpan;
            }
        }

        sr.sync();
    } finally {
        root.classList.remove("rv-pending");
    }
};

const destroy = () => {
    const root = document.documentElement;

    root.classList.remove("rv-no-motion");
    root.classList.remove("rv-pending");
    ScrollReveal().destroy();
};

export default function setupReveal() {
    onMounted(() => {
        void mount();
    });
    onBeforeUnmount(destroy);
}
