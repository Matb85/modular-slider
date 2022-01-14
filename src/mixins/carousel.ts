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
    const slide = this.slides[this.counter];
    slide.style.setProperty("--translate-factor", (this.getProperty(slide, "--translate-factor") + 1) as any);
    this.carousel--;
  },
  moveback(this: Carousel) {
    /** important!
     * counter is mutated right at the start of moveback
     */
    this.carousel++;
    const slide = this.slides[this.counter];
    slide.style.setProperty("--translate-factor", (this.getProperty(slide, "--translate-factor") - 1) as any);
  },
  reset(this: Carousel) {
    for (const slide of this.slides) slide.style.setProperty("--translate-factor", "0");
    this.carousel = 0;
    this.transform(-1);
  },
  /** essential logic & methods */
  init(this: Carousel) {
    this.carousel = 0;
    /** important!
     * this mixin uses this.carousel for maintaining reference of the current slide
     * therefore this.counter has just a getter that interprets this.carousel and returns the real value
     */
    console.log(this.slides);
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
    this.container.addEventListener("moving", () => {
      /** run only if the translation of the container is:
       *  bigger or equal to the width of one slide (including its left and right margin)
       * uses an early return to avoid to much nested code*/
      if (Math.abs(this.pos.start - this.getTransX()) / this.slideWidth < 1) return;
      /** align the slides according to the direction */
      if (this.pos.x1 > 0) {
        this.movefor();
      } else {
        this.moveback();
      }
      /** return to the initial state if the counter has a too big value */
      if (Math.abs(this.carousel) > this.slides.length - 1) this.reset();
      /** reset the "relative translation" so the condition at the beginning works correctly */
      this.pos.start = this.getTransX();
    });

    /** append or insertBefore a slide when swiping so the transition does not have any gaps */
    this.container.insertBefore(this.slides[this.slides.length - 1], this.slides[0]);
    this.transform(this.carousel - 1);

    /** return to the initial state when destroying */
    this.container.addEventListener(
      "destroy",
      () => {
        this.movefor();
        this.container.append(this.slides[0]);
      },
      { once: true }
    );
  },
  base(this: Carousel, dist: number, dur: number, direction: () => void): Promise<void> {
    return new Promise(resolve => {
      this.setTransition(dur);
      this.transform(this.carousel - dist - 1);
      setTimeout(() => {
        this.clearTransition();
        direction();
        /** return to the initial state if the counter has a too big value */
        if (Math.abs(this.carousel) > this.slides.length - 1) this.reset();
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
    if (dist === 0) return new Promise<void>(resolve => resolve());
    /** if dist == 1 || dist == -1 return a much simpler method*/
    if (Math.abs(dist) == 1) {
      if (dist > 0) return this.slideNext();
      else return this.slidePrev();
    }
    /** mock some touchEvent/mouseEvent data */
    this.pos.x1 = dist;
    this.pos.start = this.getTransX();
    /** mock the "moving" event usually fired by the touchmove/mousemove handler */
    let status = false;
    const animate = () => {
      this.container.dispatchEvent(new CustomEvent("moving"));
      if (!status) window.requestAnimationFrame(animate);
    };
    window.requestAnimationFrame(animate);
    setTimeout(() => (status = true), dur);
    /** finally return the right promise
     * note: its callback depends on the direction */
    if (dist > 0) return this.base(dist, dur, () => this.movefor());
    else return this.base(dist, dur, () => this.moveback());
  },
} as Carousel;

export default Carousel;
