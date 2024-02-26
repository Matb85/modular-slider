import { EVENTS, type SliderI } from "@/types";

interface Noloop extends SliderI {
  /** set carousel to a truthy value in the init function - might be useful for plugins
   * in this mixin it is used as a helper
   */
  base(this: Noloop, dist: number, dur?: number): Promise<void>;
}
const Noloop = {
  init(this: Noloop) {
    this.base(this.settings.initialSlide, 0);
  },
  getCurrentSlide(): number {
    return this.counter * -1;
  },
  base(this: Noloop, dist: number, dur = this.settings.transitionSpeed): Promise<void> {
    return new Promise(resolve => {
      if (this.ismoving === true) return resolve();

      this.ismoving = true;
      this.counter -= dist;
      if (this.counter > 0) this.counter = 0;
      if (this.counter < -1 * (this.slides.length - this.slideDisplay))
        this.counter = -1 * (this.slides.length - this.slideDisplay);

      this.setTransition(dur);
      this.transform(this.counter);
      const callback = () => {
        this.clearTransition();
        this.ismoving = false;
        this.pos.start = this.getTransX();
        this.container.dispatchEvent(new CustomEvent(EVENTS.TR_END));
        resolve();
      };

      if (dur !== 0) setTimeout(() => callback(), dur);
      else callback();
    });
  },
  slideNext(this: Noloop, dur = this.settings.transitionSpeed): Promise<void> {
    return this.base(Math.ceil((this.pos.start - this.getTransX()) / this.slideWidth) || 1, dur);
  },
  slidePrev(this: Noloop, dur = this.settings.transitionSpeed): Promise<void> {
    return this.base(Math.floor((this.pos.start - this.getTransX()) / this.slideWidth) || -1, dur);
  },
  slideTo(this: Noloop, to = 0, dur?: number): Promise<void> {
    return this.slideBy(to - Math.abs(this.counter), dur);
  },
  slideBy(this: Noloop, dist = 0, dur?: number): Promise<void> {
    if (dist === 0) return new Promise<void>(resolve => resolve());
    return this.base(dist, dur);
  },
  goTo(this: Noloop, dist = 0): Promise<void> {
    return this.slideTo(dist, 0);
  },
} as Noloop;

export default Noloop;
