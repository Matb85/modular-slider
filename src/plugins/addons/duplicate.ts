import type { SliderI } from "@/types";

/** this addon makes sure that there are no fewer sliders than the set number of slides per view + 2 */
export const duplicate = () =>
    function (this: SliderI) {
        /** duplicate slides if there are less than this.slideDisplay + 2 */
        if (this.slidesPerView + 2 > this.slides.length) {
            do {
                for (let i = 0, sLength = this.slides.length; i < sLength; i++) {
                    this.container.appendChild(this.slides[i].cloneNode(true));
                }
            } while (this.slidesPerView + 2 > this.slides.length);
        }

        return null;
    };
