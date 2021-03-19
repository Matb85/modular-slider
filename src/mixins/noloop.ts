import type { Defaults } from "@/defaults";
import type { Slider, PositionStore } from "@/base";

export default abstract class implements Slider {
  movedSlide: HTMLElement;
  container: HTMLElement;
  slides: HTMLCollectionOf<HTMLElement>;
  slideDisplay: number;
  settings: Required<Defaults>;
  pos: PositionStore;
  slideWidth: number;
  counter: number;
  plugins: Record<string, any>;
  carousel: boolean;
  static carousel = false;
  abstract getTransX(): number;
  abstract calcslideWidth(): number;
  abstract updateContainer(): void;
  abstract transform(dist: number): void;

  init() {
    this.slideNext(this.settings.initialSlide, 0);
  }
  base(dist, dur): Promise<void> {
    return new Promise((resolve) => {
      this.counter -= dist;
      if (this.counter > 0) this.counter = 0;
      if (this.counter < -1 * (this.slides.length - this.slideDisplay))
        this.counter = -1 * (this.slides.length - this.slideDisplay);

      this.container.style.transition = "transform " + dur + "ms";
      this.transform(this.counter);
      setTimeout(() => {
        this.container.style.transition = "initial";
        resolve();
      }, dur);
    });
  }
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
    if (dist === 0) return new Promise<void>((resolve) => resolve());
    if (dist > 0) return this.slideNext(dist);
    else return this.slidePrev(dist);
  }
}
