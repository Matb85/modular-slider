import { Slider } from "@/base";

export default (interval = 5000) =>
  function autoplay(this: Slider) {
    const setAutoplay = () => {
      autoplay = setInterval(async () => {
        await this.slideNext();
        this.container.dispatchEvent(new PointerEvent("transitionend", {}));
      }, interval);
    };
    let autoplay: ReturnType<typeof setInterval>;
    setAutoplay();
    this.container.addEventListener("pointerdown", () => clearInterval(autoplay));
    this.container.addEventListener("dragstop", () => setAutoplay());
    document.addEventListener("visibilitychange", function() {
      if (!document.hidden) clearInterval(autoplay);
      else setAutoplay();
    });
    return {
      cancel: () => clearInterval(autoplay),
      resume: () => setAutoplay(),
    };
  };
