import { EVENTS, type SliderI } from "@/types";

interface Carousel extends SliderI {
  /** set carousel to a truthy value in the init function - might be useful for plugins
   * in this mixin it is used as a helper
   */
  base(this: Carousel, dist: number, dur: number): Promise<void>;
  updateDOM(this: Carousel, dist: number): void;
  init(this: Carousel): Promise<void>;
}
let TEMP_START_POS = 0;
/** utilities specific to this mixin */
const Carousel = {
  updateDOM(this: Carousel, dist: number) {
    this.counter -= dist;
    console.log(this.counter);
    // prevent the counter from exceeding the number of slides
    if (this.counter < -1 * this.slides.length + 1 || this.counter >= this.slides.length) {
      console.log("reset");
      for (const slide of this.slides) slide.style.setProperty("--translate-factor", "0");
      this.counter = 0;
      this.transform(-1);
      TEMP_START_POS = this.slideWidth * 0;
      return;
    }
    const c = Math.abs(this.counter);
    let shouldMove = true;
    if (this.counter < 0) {
      for (let i = 0; i < this.slides.length; i++) {
        if (i == c) shouldMove = false;
        this.slides[i].style.setProperty("--translate-factor", shouldMove ? "1" : "0");
      }
    } else {
      for (let i = this.slides.length - 1; i >= 0; i--) {
        if (i == this.slides.length - 1 - c) shouldMove = false;
        this.slides[i].style.setProperty("--translate-factor", shouldMove ? "-1" : "0");
      }
    }
  },
  /** essential logic & methods */
  async init(this: Carousel) {
    const moving = () => {
      /** run only if the translation of the container is:
       *  bigger or equal to the width of one slide (including its left and right margin)
       * uses an early return to avoid too much nested code*/
      if (Math.abs(this.pos.start - this.getTransX()) / this.slideWidth < 1) return;
      /** align the slides according to the direction */
      console.log("moving");
      if (this.pos.x1 > 0) {
        this.updateDOM(1);
      } else {
        this.updateDOM(-1);
      }
      /** reset the "relative translation" so the condition at the beginning works correctly */
      this.pos.start = this.getTransX();
    };
    this.addConListener(EVENTS.MV, moving);

    /** append or insertBefore a slide when swiping so the transition does not have any gaps */
    this.transform(-1);
    // await this.slideTo(this.settings.initialSlide);

    /** return to the initial state when destroying */
    this.onDestroy(() => {
      for (const slide of this.slides) slide.style.setProperty("--translate-factor", "0");
    });
  },
  base(this: Carousel, dist: number, dur: number): Promise<void> {
    return new Promise(resolve => {
      if (this.ismoving === true) return resolve();
      this.ismoving = true;

      this.setTransition(dur);
      this.transform(this.counter - dist - 1);

      const callback = () => {
        this.clearTransition();
        this.updateDOM(dist);
        /** return to the initial state if the counter has a too big value */

        this.ismoving = false;
        resolve();
      };
      this.addTempConListener(EVENTS.TR_END, "base-tr-end", callback);
    });
  },
  slideNext(this: Carousel, dur = this.settings.transitionSpeed): Promise<void> {
    return this.base(1, dur);
  },
  slidePrev(this: Carousel, dur = this.settings.transitionSpeed): Promise<void> {
    return this.base(-1, dur);
  },
  slideTo(this: Carousel, to = 0, dur?: number): Promise<void> {
    return this.slideBy(to - this.counter, dur);
  },
  slideBy(
    this: Carousel,
    dist = 0,
    dur = this.settings.transitionSpeed * (Math.abs(dist) / this.slides.length + 1)
  ): Promise<void> {
    return new Promise(resolve => {
      /** an "early" return to avoid unnecessary burden if dist == 0 */
      if (dist === 0 || this.ismoving === true) return resolve();
      /** if dist == 1 || dist == -1 return a much simpler method*/
      if (Math.abs(dist) == 1) {
        if (dist > 0) return this.slideNext();
        else return this.slidePrev();
      }
      this.ismoving = true;
      /** mock some touchEvent/mouseEvent data */
      this.pos.x1 = dist;
      TEMP_START_POS = this.pos.start = this.getTransX();
      /** mock the "moving" event usually fired by the touchmove/mousemove handler */
      let starttime: number;
      /** based on https://medium.com/burst/understanding-animation-with-duration-and-easing-using-requestanimationframe-7e3fd1688d6c */
      const animate = (timestamp: number) => {
        if (!starttime) starttime = timestamp;
        /** How long have we been animating in total? */
        const runtime = timestamp - starttime;

        /** How much has our animation progressed relative to our duration goal?
         * The result is a number (float) between 0 and 1. So 0 is zero percent en 1 is one hundred percent. */
        const relativeProgress = this.slideWidth * dist * easeInOutQuad(runtime / dur);
        this.transformAbsolute(TEMP_START_POS - relativeProgress);
        this.container.dispatchEvent(new CustomEvent(EVENTS.MV));
        if (runtime < dur) window.requestAnimationFrame(animate);
        else {
          console.log("end");
          this.updateDOM(dist > 0 ? 1 : -1);

          this.ismoving = false;
          resolve();
        }
      };

      window.requestAnimationFrame(animate);
    });
  },
  goTo(this: Carousel, to): Promise<void> {
    const dist =
      to - this.counter == 1 ? 0 : this.counter <= 0 ? this.counter * -1 + 1 : this.slides.length - this.counter + 1;
    /** an "early" return to avoid unnecessary burden if dist == 0 */
    if (dist === 0 || this.ismoving === true) return new Promise<void>(resolve => resolve());

    return new Promise(resolve => {
      this.pos.start = this.getTransX();
      this.transformAbsolute(this.pos.start - this.slideWidth * dist);

      if (dist > 0)
        for (let i = 0; i < dist; i++) {
          this.updateDOM(1);
        }
      else
        for (let i = 0; i < -1 * dist; i++) {
          this.updateDOM(-1);
        }
      resolve();
    });
  },
} as Carousel;

export default Carousel;

function easeInOutQuad(x: number): number {
  return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
}
