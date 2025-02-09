import type { SliderI } from "@/types";

export default (interval = 5000) =>
    function autoplay(this: SliderI) {
        /** setup */
        let isRunning = false;
        let autoplay: ReturnType<typeof setInterval>;
        /** the api */
        const controls = {
            pause: () => {
                clearInterval(autoplay);
                isRunning = false;
            },
            resume: () => {
                if (isRunning) return;
                autoplay = setInterval(async () => await this.slideNext(), interval);
                isRunning = true;
            },
        };
        /** start when the slider is visible */
        const observer = new IntersectionObserver(
            entries => {
                const entry = entries[0];
                if (!entry.isIntersecting) return;
                controls.resume();
                observer.unobserve(this.container);
            },
            { threshold: 0.1 },
        );

        observer.observe(this.container);

        /** pause autoplay when the page is hidden */
        this.addDocListener("visibilitychange", function () {
            if (document.hidden) {
                controls.pause();
            } else {
                controls.resume();
            }
        });

        return controls;
    };
