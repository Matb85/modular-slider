/** import default settings + types */
import extend, { Defaults } from "./defaults";

type SliderConstructor = new (settings: Defaults) => SliderI;

/** copies methods and properties from mixin classes to the derived class
 * it is a modified version of the function here: {@link https://www.typescriptlang.org/docs/handbook/mixins.html#alternative-pattern}
 */
export function setup(...constructors: any[]): SliderConstructor {
  console.time("time");
  const base: any = getBase();
  base.prototype.inits = [];
  base.prototype.destroys = [];
  constructors.forEach(baseCtor => {
    /** copy the init functions to the inits array */
    if (Object.hasOwnProperty.call(baseCtor.prototype, "init")) {
      base.prototype.inits.push(baseCtor.prototype.init);
    }
    /** copy static properties -- redundant?? */
    // Object.keys(baseCtor).forEach(name => {
    //   Object.defineProperty(
    //     base.prototype,
    //     name,
    //     Object.getOwnPropertyDescriptor(baseCtor, name) || Object.create(null)
    //   );
    // });
    /** copy methods */
    Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
      Object.defineProperty(
        base.prototype,
        name,
        Object.getOwnPropertyDescriptor(baseCtor.prototype, name) || Object.create(null)
      );
    });
  });
  console.timeEnd("time");
  console.dir(base);
  return base;
}

export default function getBase() {
  return class implements BaseI {
    carousel: boolean;
    settings: Required<Defaults>;
    container: HTMLElement;
    slides: HTMLCollectionOf<HTMLElement>;
    pos: PositionStore = { start: 0, x1: 0, x2: 0, y1: 0, y2: 0 };
    slideWidth: number;
    slideDisplay: number;
    plugins: Record<string, any> = {};
    inits: Array<() => void>;
    destroys: Array<() => void>;
    counter = 0;

    constructor(settings: Defaults) {
      this.settings = extend(settings);
      this.container = document.getElementById(settings.container) as HTMLElement;
      this.slides = this.container.children as HTMLCollectionOf<HTMLElement>;
      this.slideWidth = this.calcSlideWidth();
      this.slideDisplay = this.getSlidesPerView();
      window.addEventListener("resize", () => {
        this.slideWidth = this.calcSlideWidth();
        this.slideDisplay = this.getSlidesPerView();
      });
      /** initiate mixins */
      for (const init of this.inits) init.call(this);
      /** reset counter after initialization */
      this.counter = 0;
      /** initiate plugins */
      for (const plugin of this.settings.plugins) this.plugins[plugin.name] = plugin.call(this);
    }

    /** updating utilities */
    getTransX(): number {
      return parseFloat(window.getComputedStyle(this.container).transform.split(", ")[4]);
    }
    getProperty(el: HTMLElement, elProp: string): number {
      return parseInt(window.getComputedStyle(el).getPropertyValue(elProp));
    }
    calcSlideWidth(): number {
      return (
        this.slides[0].offsetWidth +
        this.getProperty(this.slides[0], "margin-left") +
        this.getProperty(this.slides[0], "margin-right")
      );
    }
    getSlidesPerView(): number {
      const slidesPerView = this.getProperty(this.container.parentElement as HTMLElement, "--slides-per-view");
      return !isNaN(slidesPerView) ? slidesPerView : this.getProperty(document.documentElement, "--slides-per-view");
    }
    /**
     * a utility for transforming the container by the length of one slide mulitplied by @param dist
     * mainly used for transforming to another slide
     */
    transform(dist: number): void {
      this.container.style.transform = "translate3d(" + this.slideWidth * dist + "px,0,0)";
    }
    /**
     * a utility for transforming the container by an absolute number of px specified by @param Absolutedist
     * mainly used for handling touch/mouse events
     */
    transformAbsolute(Absolutedist: number): void {
      this.container.style.transform = "translate3d(" + Absolutedist + "px,0,0)";
    }
    destroy() {
      this.container.dispatchEvent(new CustomEvent("destroy"));
      this.transform(0);
    }
  };
}

interface BaseI {
  carousel: boolean;
  settings: Required<Defaults>;
  container: HTMLElement;
  slides: HTMLCollectionOf<HTMLElement>;
  pos: PositionStore;
  slideWidth: number;
  slideDisplay: number;
  counter: number;
  plugins: Record<string, any>;
  getTransX(): number;
  calcSlideWidth(): number;
  transform(dist: number): void;
  transformAbsolute(Absolutedist: number): void;
  destroy(): void;
}

export interface SliderI extends BaseI {
  slideNext(dist?: number, dur?: number): Promise<void>;
  slidePrev(dist?: number, dur?: number): Promise<void>;
  slideBy(dist?: number): Promise<void>;
  slideTo(to?: number): Promise<void>;
}

export interface PositionStore {
  start: number;
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}
