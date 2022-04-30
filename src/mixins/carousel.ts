import type { SliderI } from "@/base";

interface Carousel extends SliderI {
  /** set carousel to a truthy value in the init function - might be useful for plugins
   * in this mixin it is used as a helper
   */
  carousel: number;
  movefor(this: SliderI): void;
  moveback(this: SliderI): void;
  base(this: Carousel, dist: number, dur: number, direction: () => void): Promise<void>;
  reset(this: Carousel): void;
}

/** utilities specific to this mixin */
const Carousel = {
  movefor(this: Carousel) {
    /** important!
     * counter is mutated at the end of movefor
     */
    const slide = this.slides[this.counter % this.slides.length];
    slide.style.setProperty("--translate-factor", (this.getProperty(slide, "--translate-factor") + 1) as any);
    this.carousel--;
  },
  moveback(this: Carousel) {
    /** important!
     * counter is mutated right at the start of moveback
     */
    this.carousel++;
    const slide = this.slides[this.counter % this.slides.length];
    slide.style.setProperty("--translate-factor", (this.getProperty(slide, "--translate-factor") - 1) as any);
  },
  /** important!
   * to keep the css properties low, reset the if the counter is larger than the amount of slides!
   */
  reset(this: Carousel) {
    if (this.counter < this.slides.length) return;
    for (const slide of this.slides) {
      const factor = this.getProperty(slide, "--translate-factor");
      slide.style.setProperty("--translate-factor", (factor < 0 ? "-" : "") + (Math.abs(factor) - 1));
    }
    this.carousel = this.slides.length - (this.counter % this.slides.length);
    this.transform(-1 * this.counter - 1);
  },
  /** essential logic & methods */
  init(this: Carousel) {
    this.carousel = 0;
    /** important!
     * this mixin uses this.carousel for maintaining reference of the current slide
     * therefore this.counter has just a getter that interprets this.carousel and returns the real value
     */
    Object.defineProperty(this, "counter", {
      get(): number {
        return this.carousel <= 0 ? Math.abs(this.carousel) : this.slides.length - Math.abs(this.carousel);
      },
    });
    /** duplicate slides if there are less than this.slideDisplay + 2 */
    if (this.slideDisplay + 2 > this.slides.length) {
      do {
        for (let i = 0, slength = this.slides.length; i < slength; i++) {
          this.container.appendChild(this.slides[i].cloneNode(true));
        }
      } while (this.slideDisplay + 2 > this.slides.length);
    }
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
    this.container.addEventListener("moving", moving);

    /** append or insertBefore a slide when swiping so the transition does not have any gaps */
    this.container.insertBefore(this.slides[this.slides.length - 1], this.slides[0]);
    this.transform(this.carousel - 1);

    /** return to the initial state when destroying */
    this.container.addEventListener(
      "destroy",
      () => {
        this.container.removeEventListener("moving", moving);
        this.movefor();
        this.container.append(this.slides[0]);
      },
      { once: true }
    );
  },
  base(this: Carousel, dist: number, dur: number, direction: () => void): Promise<void> {
    return new Promise(resolve => {
      if (this.ismoving === true) {
        resolve();
        return;
      }
      this.ismoving = true;
      this.setTransition(dur);
      this.transformAbsolute(this.pos.start - this.slideWidth * dist);
      setTimeout(() => {
        this.clearTransition();
        direction();
        /** return to the initial state if the counter has a too big value */
        this.reset();

        this.ismoving = false;
        resolve();
      }, dur);
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
    /** mock some touchEvent/mouseEvent data */
    this.pos.x1 = dist;
    this.pos.start = this.getTransX();
    /** mock the "moving" event usually fired by the touchmove/mousemove handler */
    const animate = setInterval(() => {
      if (Math.abs(this.carousel) > this.slides.length - 1) this.clearTransition();
      this.container.dispatchEvent(new CustomEvent("moving"));
      this.setTransition(dur);
    }, 10);
    setTimeout(() => clearInterval(animate), dur);
    /** finally return the right promise
     * note: its callback depends on the direction */
    if (dist > 0) return this.base(dist, dur, () => this.movefor());
    else return this.base(dist, dur, () => this.moveback());
  },
} as Carousel;

export default Carousel;
