import { Defaults } from "@/defaults";
import { MergeCtor, MixinBase } from "@/types";

export default function noloop<TBase extends MixinBase>(Base: TBase) {
  const Derived = class extends (Base as any) {
    constructor(props: Defaults) {
      super(props);
      this.slideNext(this.settings.initialSlide, 0);
    }
    base = (dist, dur): Promise<void> =>
      new Promise(resolve => {
        this.counter -= dist;
        if (this.counter > 0) this.counter = 0;
        if (this.counter < -1 * (this.slides.length - this.slideDisplay))
          this.counter = -1 * (this.slides.length - this.slideDisplay);

        this.container.style.transition = "transform " + dur + "ms";
        this.container.style.transform = "translateX(" + this.slideWidth * this.counter + "px)";
        setTimeout(() => {
          this.container.style.transition = "initial";
          resolve();
        }, dur);
      });

    slideNext(
      dist = Math.ceil((this.pos.start - this.getTransX()) / this.slideWidth),
      dur = this.settings.transitionSpeed
    ): Promise<void> {
      return this.base(dist, dur);
    }
    slidePrev(
      dist = Math.floor((this.pos.start - this.getTransX()) / this.slideWidth),
      dur = this.settings.transitionSpeed
    ): Promise<void> {
      return this.base(dist, dur);
    }
    slideTo(to = 0): Promise<void> {
      return this.slideBy(to - Math.abs(this.counter));
    }
    slideBy(dist = 0): Promise<void> {
      if (dist === 0) return new Promise<void>(resolve => resolve());
      if (dist > 0) return this.slideNext(dist);
      else return this.slidePrev(dist);
    }
  };
  return Derived as MergeCtor<typeof Derived, TBase>;
}
