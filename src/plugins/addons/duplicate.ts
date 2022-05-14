import type { SliderI } from "@/base";

/** this addon makes sure that there are no fewer sliders than the set number of slides per view + 2 */
export default () =>
  function duplicate(this: SliderI) {
    /** duplicate slides if there are less than this.slideDisplay + 2 */
    if (this.slideDisplay + 2 > this.slides.length) {
      do {
        for (let i = 0, slength = this.slides.length; i < slength; i++) {
          this.container.appendChild(this.slides[i].cloneNode(true));
        }
      } while (this.slideDisplay + 2 > this.slides.length);
    }

    return null;
  };
