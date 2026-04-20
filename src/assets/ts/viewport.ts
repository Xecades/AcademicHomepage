const DESKTOP_MEDIA_QUERY = "(min-width: 768px)";

const canUseWindow = () => typeof window !== "undefined";

export const isDesktopViewport = () => {
    if (!canUseWindow()) {
        return false;
    }

    return window.matchMedia(DESKTOP_MEDIA_QUERY).matches;
};

export const isMobileViewport = () => !isDesktopViewport();

export { DESKTOP_MEDIA_QUERY };
