import { namedPlugin, type SliderI } from "@/types";

export const autoplay = (interval = 5000) =>
    namedPlugin("autoplay", function (this: SliderI) {
        /** setup */
        let isRunning = false;
        let isVisible = false;
        /** set by pause() - only resume() may start the slider again, coming back into view may not */
        let isPaused = false;
        let autoplay: ReturnType<typeof setInterval>;
        const start = () => {
            if (isRunning || isPaused || !isVisible || document.hidden) return;
            autoplay = setInterval(async () => await this.slideNext(), interval);
            isRunning = true;
        };
        const stop = () => {
            clearInterval(autoplay);
            isRunning = false;
        };
        /** the api */
        const controls = {
            pause: () => {
                isPaused = true;
                stop();
            },
            resume: () => {
                isPaused = false;
                start();
            },
        };
        const observer = new IntersectionObserver(
            entries => {
                isVisible = entries[entries.length - 1].isIntersecting;
                if (isVisible) start();
                else stop();
            },
            { threshold: 0.1 },
        );

        /** observe the wrapper - only a part of the container is ever in view */
        observer.observe(this.container.parentElement || this.container);

        /** pause autoplay when the page is hidden */
        this.addDocListener("visibilitychange", function () {
            if (document.hidden) {
                stop();
            } else {
                start();
            }
        });

        this.onDestroy(() => {
            stop();
            observer.disconnect();
        });

        return controls;
    });
