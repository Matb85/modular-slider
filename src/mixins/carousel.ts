import type { Defaults } from "@/defaults";
import type { SliderI, PositionStore } from "@/base";

export default abstract class implements SliderI {
  container: HTMLElement;
  slides: HTMLCollectionOf<HTMLElement>;
  slideDisplay: number;
  settings: Required<Defaults>;
  pos: PositionStore;
  slideWidth: number;
  counter: number;
  plugins: Record<string, any>;
  /** set carousel to a truthy value in the init function - might be useful for plugins
   * in this mixin it is used as a helper
   */
  carousel: boolean;
  abstract getTransX(): number;
  abstract calcSlideWidth(): number;
  abstract transform(dist: number): void;
  abstract transformAbsolute(Absolutedist: number): void;
  abstract destroy(): void;
  abstract getProperty(el: HTMLElement, elProp: string): number;
  /** utilities specific to this mixin */
  movefor() {
    const index = this.counter <= 0 ? Math.abs(this.counter) : this.slides.length - Math.abs(this.counter);
    const slide = this.slides[index];
    slide.style.setProperty("--translate-factor", (this.getProperty(slide, "--translate-factor") + 1) as any);
    this.counter--;
  }
  moveback() {
    this.counter++;
    const index = this.counter <= 0 ? Math.abs(this.counter) : this.slides.length - Math.abs(this.counter);
    const slide = this.slides[index];
    slide.style.setProperty("--translate-factor", (this.getProperty(slide, "--translate-factor") - 1) as any);
  }
  reset() {
    for (const slide of this.slides) slide.style.setProperty("--translate-factor", "0");
    this.counter = 0;
    this.transform(-1);
  }
  /** essential logic & methods */
  init() {
    /** set carousel to true */
    this.carousel = true;
    /** duplicate slides if there are less than this.slideDisplay + 2 */
    if (this.slideDisplay + 2 > this.slides.length) {
      do {
        for (let i = 0, counter = this.slides.length; i < counter; i++) {
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
      if (Math.abs(this.counter) > this.slides.length - 1) this.reset();

      this.pos.start = this.getTransX();
    });

    /** append or insertBefore a slide when swiping so the transition does not have any gaps */
    this.container.insertBefore(this.slides[this.slides.length - 1], this.slides[0]);
    this.transform(this.counter - 1);

    /** return to the initial state when destroying */
    this.container.addEventListener("destroy", () => this.movefor(), { once: true });
  }
  base(dist, dur, direction): Promise<void> {
    return new Promise(resolve => {
      this.container.style.transition = "transform " + dur + "ms";
      this.transform(this.counter - dist - 1);
      setTimeout(() => {
        this.container.style.transition = "initial";
        direction(this);
        /** return to the initial state if the counter has a too big value */
        if (Math.abs(this.counter) > this.slides.length - 1) this.reset();
        resolve();
      }, dur);
    });
  }
  slideNext(dur = this.settings.transitionSpeed): Promise<void> {
    return this.base(1, dur, () => this.movefor());
  }
  slidePrev(dur = this.settings.transitionSpeed): Promise<void> {
    return this.base(-1, dur, () => this.moveback());
  }
  slideTo(to = 0): Promise<void> {
    const index = this.counter <= 0 ? Math.abs(this.counter) : this.slides.length - Math.abs(this.counter);
    return this.slideBy(to - index);
  }
  slideBy(dist = 0): Promise<void> {
    /** an "early" return to avoid unnecessary burden if dist's values is low  */
    if (dist === 0) return new Promise<void>(resolve => resolve());
    /** return much simpler solution if */
    if (Math.abs(dist) == 1) {
      if (dist > 0) return this.slideNext();
      else return this.slidePrev();
    }
    const dur = this.settings.transitionSpeed * (Math.abs(dist) / this.slides.length + 1);
    /** mock some touchEvent/mouseEvent data */
    this.pos.x1 = dist;
    this.pos.start = this.getTransX();
    /** mock an event usually fired by the touchmove/mousemove handler */
    const autoplay = setInterval(() => this.container.dispatchEvent(new CustomEvent("moving")), 20);
    setTimeout(() => clearInterval(autoplay), dur);
    /** finally return the right promise
     * note: its callback depends on the direction */
    if (dist > 0)
      return this.base(dist, dur, () => {
        this.movefor();
      });
    else
      return this.base(dist, dur, () => {
        this.moveback();
      });
  }
}
