import type { SliderI } from "@/base";

export default (interval = 5000) =>
  function autoplay(this: SliderI) {
    /** setup */
    let isrunning = false;
    let autoplay: ReturnType<typeof setInterval>;
    /** the api */
    const controls = {
      pause: () => {
        console.log("pause");
        clearInterval(autoplay);
        isrunning = false;
      },
      resume: () => {
        console.log("resume");
        if (isrunning) return;
        autoplay = setInterval(async () => await this.slideNext(), interval);
        isrunning = true;
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
      { threshold: 0.1 }
    );

    observer.observe(this.container);

    /** pause autoplay when the page is hidden */
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        controls.pause();
      } else {
        controls.resume();
      }
    });

    /** clear interval when destroying */
    this.container.addEventListener("destroy", () => clearInterval(autoplay), { once: true });

    return controls;
  };
