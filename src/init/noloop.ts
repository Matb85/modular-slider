import { Defaults } from "@/defaults";
import { MergeCtor, MixinBase } from "@/types";

export default function noloop<TBase extends MixinBase>(Base: TBase) {
  const Derived = class extends (Base as any) {
    constructor(props: Defaults) {
      super(props);
      this.slideNext(this.settings.initialSlide, 0);
    }
    base(dist, dur) {
      this.counter -= dist;
      if (this.counter > 0) this.counter = 0;
      if (this.counter < -1 * (this.slides.length - this.slideDisplay))
        this.counter = -1 * (this.slides.length - this.slideDisplay);
      this.container.style.transition = "transform " + dur + "ms";
      this.container.style.transform = "translateX(" + this.slideWidth * this.counter + "px)";
      setTimeout(() => {
        this.container.style.transition = "initial";
      }, dur);
    }

    slideNext(
      dist = Math.ceil((this.pos.start - this.getTransX()) / this.slideWidth),
      dur = this.settings.transitionSpeed
    ) {
      this.base.call(this, dist, dur);
    }
    slidePrev(
      dist = Math.floor((this.pos.start - this.getTransX()) / this.slideWidth),
      dur = this.settings.transitionSpeed
    ) {
      this.base.call(this, dist, dur);
    }
    slideTo(to = 0) {
      this.slideBy(to - Math.abs(this.counter));
    }
    slideBy(dist = 0) {
      if (dist == 0) return;
      if (dist > 0) this.slideNext(dist);
      else this.slidePrev(dist);
    }
  };
  return Derived as MergeCtor<typeof Derived, TBase>;
}
