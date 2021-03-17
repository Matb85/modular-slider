/** import default settings + types */
import extend, { Defaults } from "./defaults";

type SliderConstructor = new (settings: Defaults) => Slider;

/** copies methods and properties from mixin classes to the derived class
 * it is a modified version of the function here: {@link https://www.typescriptlang.org/docs/handbook/mixins.html#alternative-pattern}
 */
export function setup(...constructors: any[]): SliderConstructor {
  const base = Base as any;
  base.prototype.inits = [];
  constructors.forEach(baseCtor => {
    /** copy the init functions to the inits array */
    if (Object.hasOwnProperty.call(baseCtor.prototype, "init")) base.prototype.inits.push(baseCtor.prototype.init);
    /** copy statis properties */
    Object.keys(baseCtor).forEach(name => {
      Object.defineProperty(
        base.prototype,
        name,
        Object.getOwnPropertyDescriptor(baseCtor, name) || Object.create(null)
      );
    });
    /** copy methods */
    Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
      Object.defineProperty(
        base.prototype,
        name,
        Object.getOwnPropertyDescriptor(baseCtor.prototype, name) || Object.create(null)
      );
    });
  });
  return base;
}

export default abstract class Base implements Slider {
  carousel: boolean;
  settings: Required<Defaults>;
  container: HTMLElement;
  slides: HTMLCollectionOf<HTMLElement>;
  pos: PositionStore = { start: 0, x1: 0, x2: 0, y1: 0, y2: 0 };
  slideWidth: number;
  slideDisplay: number;
  plugins: Record<string, any> = {};
  inits: Array<() => void>;
  counter = 0;
  abstract slideNext(dist?: number, dur?: number): Promise<void>;
  abstract slidePrev(dist?: number, dur?: number): Promise<void>;
  abstract slideBy(dist?: number): Promise<void>;
  abstract slideTo(to?: number): Promise<void>;

  constructor(settings: Defaults) {
    this.settings = extend(settings);
    this.container = document.querySelector(settings.container) as HTMLElement;
    this.slides = this.container.children as HTMLCollectionOf<HTMLElement>;
    this.slideWidth = this.calcslideWidth();
    this.slideDisplay = this.settings.slidesPerView;

    window.addEventListener("resize", () => {
      this.slideWidth = this.calcslideWidth();
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

export interface Slider {
  carousel: boolean;
  settings: Required<Defaults>;
  container: HTMLElement;
  slides: HTMLCollectionOf<HTMLElement>;
  pos: PositionStore;
  slideWidth: number;
  slideDisplay: number;
  counter: number;
  plugins: Record<string, any>;
  slideNext(dist?: number, dur?: number): Promise<void>;
  slidePrev(dist?: number, dur?: number): Promise<void>;
  slideBy(dist?: number): Promise<void>;
  slideTo(to?: number): Promise<void>;
  getTransX(): number;
  calcslideWidth(): number;
  updateContainer(): void;
}

export interface PositionStore {
  start: number;
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}
