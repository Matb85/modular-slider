console.time("loop");
/** import default settings + types */
import { extend, Defaults } from "./defaults";
/**import event handlers */
import SlideHandler from "./slidehander";
/**import mixins */
import carousel from "./init/carousel";
import noloop from "./init/noloop";
import buttons from "./controls/buttons";
import pagination from "./controls/pagination";
import autoplay from "./addons/autoplay";
export { carousel, noloop, pagination, autoplay, buttons };

export function Pipe(decorators: Array<any>, n: number = decorators.length): typeof Slider {
  if (n == 0) return Slider;
  return decorators[n - 1](Pipe(decorators, n - 1));
}

//object
export class Slider {
  carousel: boolean;
  settings: Required<Defaults>;
  container: HTMLElement;
  slides: HTMLCollectionOf<HTMLElement>;
  pos = { start: 0, x1: 0, x2: 0, y1: 0, y2: 0 };
  slideWidth: number;
  slideDisplay: number;
  counter = 1;
  slideNext: (dist?: number, dur?: number) => Promise<void>;
  slidePrev: (dist?: number, dur?: number) => Promise<void>;
  slideBy: (dist?: number) => Promise<void>;
  slideTo: (to?: number) => Promise<void>;

  constructor(settings: Defaults) {
    this.settings = extend(settings);
    this.container = document.querySelector(settings.container) as HTMLElement;
    this.slides = this.container.children as HTMLCollectionOf<HTMLElement>;
    this.slideWidth = this.calcslideWidth();
    this.slideDisplay = this.settings.slidesPerView;
    this.container.addEventListener("pointerdown", pEvent => SlideHandler.call(this, pEvent), { once: true });
    window.addEventListener("resize", () => {
      this.slideWidth = this.calcslideWidth();
    });
    for (const plugin of this.settings.plugins) plugin.call(this);
  }

  /** updating utilities */
  getTransX(): number {
    return parseFloat(window.getComputedStyle(this.container).transform.split(", ")[4]);
  }
  calcslideWidth(): number {
    return (
      this.slides[0].offsetWidth +
      this.getProperty(this.slides[0], "margin-left") +
      this.getProperty(this.slides[0], "margin-right")
    );
  }
  getProperty(el: HTMLElement, elProp: string): number {
    return parseInt(window.getComputedStyle(el).getPropertyValue(elProp));
  }
  updateContainer(): void {
    this.container = document.querySelector(this.settings.container) as HTMLElement;
    this.slides = this.container.children as HTMLCollectionOf<HTMLElement>;
  }
}

//listeners

console.timeEnd("loop");
