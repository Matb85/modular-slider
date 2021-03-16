import { Slider } from "@/base";

export default (interval = 5000) =>
  function pagination(this: Slider) {
    let autoplay = setInterval(() => this.slideNext(), interval);
    this.container.addEventListener("pointerdown", () => clearInterval(autoplay));
    this.container.addEventListener("dragStop", () => {
      autoplay = setInterval(() => {
        this.slideNext();
      }, interval);
    });
  };
