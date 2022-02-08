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
        autoplay = setInterval(async () => {
          this.container.dispatchEvent(new CustomEvent("pointerdragstart", {}));
          await this.slideNext();
          this.container.dispatchEvent(new CustomEvent("transitionend", {}));
        }, interval);
        isrunning = true;
      },
    };
    /** start */
    controls.resume();
    /** setup the necessary listeners to prevent UX issues when dragging */
    this.container.addEventListener("pointerdragstart", () => controls.pause());
    this.container.addEventListener("transitionend", () => {
      controls.resume();
    });
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
        this.container.removeEventListener("pointerdragstart", () => controls.pause());
        this.container.removeEventListener("transitionend", () => controls.resume());
      },
      { once: true }
    );

    return controls;
  };
