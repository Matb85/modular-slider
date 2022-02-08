/** copies methods and properties from mixin classes to the derived class
 * it is a modified version of the function here: {@link https://www.typescriptlang.org/docs/handbook/mixins.html#alternative-pattern}
 */
export function setup<K, L, M, N>(
  ...constructors: [K, L, M, N] | [K, L, M] | [K, L, M] | [K, L] | [K]
): new (settings: Defaults) => SliderI & K & L & M & N {
  const base = getBase();
  base.prototype.inits = [];
  base.prototype.destroys = [];
  constructors.forEach(baseCtor => {
    /** copy the init functions to the inits array */
    if (Object.hasOwnProperty.call(baseCtor, "init")) {
      base.prototype.inits.push(baseCtor["init" as keyof typeof baseCtor]);
    }
    /** copy methods */
    Object.getOwnPropertyNames(baseCtor).forEach(name => {
      base.prototype[name] = baseCtor[name as keyof typeof baseCtor];
    });
  });
  return base as new (settings: Defaults) => SliderI & K & L & M & N;
}
/**
 * Defaults
 */

const defaults = {
  easing: "ease",
  container: "",
  transitionSpeed: 300,
  initialSlide: 0,
  plugins: [],
};
type RequiredBy<K, T extends keyof K> = Omit<Partial<K>, "plugins"> & Pick<K, T> & { plugins: Array<() => void> };
type Defaults = RequiredBy<typeof defaults, "container">;

/**
 * the interface for the base
 */

export interface SliderI {
  carousel?: any;
  settings: Required<Defaults>;
  container: HTMLElement;
  slides: HTMLCollectionOf<HTMLElement>;
  pos: { start: number; x1: number; x2: number; y1: number; y2: number };
  slideWidth: number;
  slideDisplay: number;
  counter: number;
  plugins: Record<string, any>;
  getTransX(): number;
  calcSlideWidth(): number;
  transform(dist: number): void;
  transformAbsolute(Absolutedist: number): void;
  setTransition(dur: number): void;
  clearTransition(): void;
  destroy(): void;
  getProperty(el: HTMLElement, elProp: string): number;
  slideNext(dur?: number): Promise<void>;
  slidePrev(dur?: number): Promise<void>;
  slideBy(dist: number, dur?: number): Promise<void>;
  slideTo(to: number, dur?: number): Promise<void>;
  init(): void;
}

/**
 * the base class
 */
export default function getBase(): new (settings: Defaults) => SliderI {
  return class implements SliderI {
    carousel: boolean;
    settings: Required<Defaults>;
    container: HTMLElement;
    slides: HTMLCollectionOf<HTMLElement>;
    pos = { start: 0, x1: 0, x2: 0, y1: 0, y2: 0 };
    slideWidth: number;
    slideDisplay: number;
    plugins: Record<string, any> = {};
    inits: Array<() => void>;
    destroys: Array<() => void>;
    counter = 0;
    slideNext: (dur?: number) => Promise<void>;
    slidePrev: (dur?: number) => Promise<void>;
    slideBy: (dist?: number) => Promise<void>;
    slideTo: (to?: number) => Promise<void>;
    init: () => void;
    constructor(settings: Defaults) {
      this.settings = { ...defaults, ...settings } as Required<Defaults>;
      console.log(this.settings);
      this.container = document.getElementById(settings.container) as HTMLElement;
      this.slides = this.container.children as HTMLCollectionOf<HTMLElement>;
      this.container.style.setProperty("--number-of-slides", this.slides.length.toString());
      this.slideWidth = this.calcSlideWidth();
      this.slideDisplay = this.getSlidesPerView();
      const handler = () => {
        this.slideWidth = this.calcSlideWidth();
        this.slideDisplay = this.getSlidesPerView();
      };
      window.addEventListener("resize", handler);
      this.container.addEventListener("destroy", () => window.removeEventListener("resize", handler), { once: true });

      /** initiate mixins */
      for (const init of this.inits) init.call(this);
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
    /**
     * utilities for managing the container's tration easing @param dur
     * mainly used for handling touch/mouse events
     */
    setTransition(dur: number) {
      this.container.style.transition = "transform " + dur + "ms " + this.settings.easing;
    }
    clearTransition() {
      this.container.style.transition = "initial";
    }

    destroy() {
      this.container.dispatchEvent(new CustomEvent("destroy"));
      this.transform(0);
    }
  };
}
