import type { SliderI } from "@/base";

export default (interval = 5000) =>
  function autoplay(this: SliderI) {
    /** setup */
    let isrunning = false;
    let autoplay: ReturnType<typeof setInterval>;
    /** the api */
    const controls = {
      pause: () => {
        clearInterval(autoplay);
        isrunning = false;
      },
      resume: () => {
        if (isrunning) return;
        autoplay = setInterval(async () => {
          await this.slideNext();
          this.container.dispatchEvent(new CustomEvent("transitionend", {}));
        }, interval);
        isrunning = true;
      },
    };
    /** start */
    controls.resume();
    /** setup the necessary listeners to prevent UX issues when dragging */
    this.container.addEventListener("pointerdown", () => controls.pause());
    this.container.addEventListener("dragstop", () => controls.resume());
    /** pause autoplay when the page is hidden */
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        controls.pause();
      } else {
        controls.resume();
      }
    });
    /** clear interval when destroying */
    this.container.addEventListener(
      "destroy",
      () => {
        clearInterval(autoplay);
        this.container.removeEventListener("pointerdown", () => controls.pause());
        this.container.removeEventListener("dragstop", () => controls.resume());
      },
      { once: true }
    );

    return controls;
  };
