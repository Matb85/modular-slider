import type { SliderI } from "@/base";

export default (interval = 5000) =>
  function autoplay(this: SliderI) {
    let ispaused = false;
    let autoplay: ReturnType<typeof setInterval>;
    const setAutoplay = () => {
      if (!ispaused)
        autoplay = setInterval(async () => {
          await this.slideNext();
          this.container.dispatchEvent(new CustomEvent("transitionend", {}));
        }, interval);
    };
    setAutoplay();
    this.container.addEventListener("pointerdown", () => clearInterval(autoplay));
    this.container.addEventListener("dragstop", () => setAutoplay());
    document.addEventListener("visibilitychange", function() {
      if (!document.hidden) clearInterval(autoplay);
      else setAutoplay();
    });
    /** clear interval when destroying */
    this.container.addEventListener("destroy",() => clearInterval(autoplay));
    return {
      pause: () => {
        clearInterval(autoplay);
        ispaused = true;
      },
      resume: () => {
        ispaused = false;
        setAutoplay();
      },
    };
  };
