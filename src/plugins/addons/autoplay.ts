import type { Slider } from "@/base";

export default (interval = 5000) =>
  function autoplay(this: Slider) {
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
    return {
      pause: () => {
        clearInterval(autoplay);
        ispaused = true;
      },
      resume: () => {
        ispaused = false;
        setAutoplay();
      }
    };
  };
