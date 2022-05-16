import type { SliderI } from "@/base";
import { ONCE } from "@/base";

interface Carousel extends SliderI {
  /** set carousel to a truthy value in the init function - might be useful for plugins
   * in this mixin it is used as a helper
   */
  carousel: number;
  helperCounter: number;
  movefor(this: SliderI): void;
  moveback(this: SliderI): void;
  base(this: Carousel, dist: number, dur: number, direction: () => void): Promise<void>;
  reset(this: Carousel): void;
  init(this: Carousel): Promise<void>;
}

/** utilities specific to this mixin */
const Carousel = {
  movefor(this: Carousel) {
    /** important!
     * counter is mutated at the end of movefor
     */
    const slide = this.slides[this.helperCounter];
    slide.style.setProperty("--translate-factor", (this.getProperty(slide, "--translate-factor") + 1) as any);
    this.carousel--;
  },
  moveback(this: Carousel) {
    /** important!
     * counter is mutated right at the start of moveback
     */
    this.carousel++;
    const slide = this.slides[this.helperCounter];
    slide.style.setProperty("--translate-factor", (this.getProperty(slide, "--translate-factor") - 1) as any);
  },
  /** important!
   * to keep the css properties low, reset the if the counter is larger than the amount of slides!
   */
  reset(this: Carousel) {
    if (Math.abs(this.carousel) < this.slides.length) return;

    for (const slide of this.slides) {
      const factor = this.getProperty(slide, "--translate-factor");
      slide.style.setProperty("--translate-factor", "" + (factor < 0 ? factor + 1 : factor - 1));
    }
    if (this.carousel < 0) {
      this.carousel = this.slides.length + this.carousel;

      this.transformAbsolute(this.getTransX() + this.slides.length * this.slideWidth);
    } else {
      this.carousel = Math.abs(this.slides.length - this.carousel);

      this.transformAbsolute(this.getTransX() - this.slides.length * this.slideWidth);
    }
    this.pos.start = this.getTransX();
  },
  /** essential logic & methods */
  async init(this: Carousel) {
    /** important!
     * this mixin uses this.carousel & this.helperCounter
     * this structure is used to avoid DOM cloning of slides
     * carousel is an integer for maintaining reference of the current slide
     * helperCounter is a whole number that references the current slide
     * counter equals helperCounter -1 but must be smaller than the number of slides and positive
     */
    this.carousel = 0;
    Object.defineProperty(this, "helperCounter", {
      get(): number {
        const len = this.slides.length,
          car = this.carousel;
        return (car <= 0 ? -1 * car : len - (car % len)) % len;
      },
    });
    Object.defineProperty(this, "counter", {
      get(): number {
        const len = this.slides.length,
          car = this.carousel;
        if (car === 1) return 0;
        return (car <= 0 ? -1 * car + 1 : len - (car - 1)) % len;
      },
    });
    const moving = () => {
      /** run only if the translation of the container is:
       *  bigger or equal to the width of one slide (including its left and right margin)
       * uses an early return to avoid too much nested code*/
      if (Math.abs(this.pos.start - this.getTransX()) / this.slideWidth < 1) return;
      /** align the slides according to the direction */
      if (this.pos.x1 > 0) {
        this.movefor();
      } else {
        this.moveback();
      }
      /** reset the "relative translation" so the condition at the beginning works correctly */
      this.pos.start = this.getTransX();
    };
    this.addConListener("ms-moving", moving);

    /** append or insertBefore a slide when swiping so the transition does not have any gaps */
    this.transform(-1);
    await this.slideTo(this.settings.initialSlide);

    /** return to the initial state when destroying */
    this.onDestroy(() => {
      for (const slide of this.slides) slide.style.setProperty("--translate-factor", "0");
    });
  },
  base(this: Carousel, dist: number, dur: number, direction: () => void): Promise<void> {
    return new Promise(resolve => {
      if (this.ismoving === true) return resolve();
      this.ismoving = true;

      this.setTransition(dur);
      this.transform(this.carousel - dist - 1);

      const callback = () => {
        this.clearTransition();
        direction();
        /** return to the initial state if the counter has a too big value */
        this.reset();

        this.ismoving = false;
        resolve();
      };
      this.addConListener("ms-transitionend", callback, ONCE);
    });
  },
  slideNext(this: Carousel, dur = this.settings.transitionSpeed): Promise<void> {
    return this.base(1, dur, () => this.movefor());
  },
  slidePrev(this: Carousel, dur = this.settings.transitionSpeed): Promise<void> {
    return this.base(-1, dur, () => this.moveback());
  },
  slideTo(this: Carousel, to = 0, dur?: number): Promise<void> {
    return this.slideBy(to - this.counter, dur);
  },
  slideBy(
    this: Carousel,
    dist = 0,
    dur = this.settings.transitionSpeed * (Math.abs(dist) / this.slides.length + 1)
  ): Promise<void> {
    /** an "early" return to avoid unnecessary burden if dist == 0 */
    if (dist === 0 || this.ismoving === true) return new Promise<void>(resolve => resolve());
    /** if dist == 1 || dist == -1 return a much simpler method*/
    if (Math.abs(dist) == 1) {
      if (dist > 0) return this.slideNext();
      else return this.slidePrev();
    }
    this.ismoving = true;
    /** mock some touchEvent/mouseEvent data */
    this.pos.x1 = dist;
    this.pos.start = this.getTransX();
    /** mock the "moving" event usually fired by the touchmove/mousemove handler */
    let iscompleted = false;
    let start: number;
    const animate = (timestamp: number) => {
      if (start === undefined) {
        start = timestamp;
      }
      this.container.dispatchEvent(new CustomEvent("ms-moving"));
      console.log(Math.round(timestamp - start));
      if (!iscompleted) window.requestAnimationFrame(animate);
    };
    window.requestAnimationFrame(animate);

    /** finally return the right promise
     * note: its callback depends on the direction */
    return new Promise(resolve => {
      this.setTransition(dur);
      this.transformAbsolute(this.pos.start - this.slideWidth * dist);

      const callback = () => {
        this.clearTransition();
        if (dist > 0) this.movefor();
        else this.moveback();

        /** return to the initial state if the counter has a too big value */
        this.reset();
        this.ismoving = false;
        iscompleted = true;
        resolve();
      };
      this.addConListener("ms-transitionend", callback, ONCE);
    });
  },
} as Carousel;

export default Carousel;
