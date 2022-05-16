/** copies methods and properties from mixin classes to the derived class
 * it is a modified version of the function here: {@link https://www.typescriptlang.org/docs/handbook/mixins.html#alternative-pattern}
 */
export function setup<K, L, M, N>(
  ...constructors: [K, L, M, N] | [K, L, M] | [K, L, M] | [K, L] | [K]
): new (settings: Defaults) => SliderI & K & L & M & N {
  const base = getBase();
  base.prototype.inits = [];
  constructors.forEach(baseCtor => {
    /** copy the init functions to the inits array */
    if (Object.hasOwnProperty.call(baseCtor, "init"))
      base.prototype.inits.push(baseCtor["init" as keyof typeof baseCtor]);

    /** copy methods */
    Object.assign(base.prototype, baseCtor);
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
  ismoving: boolean;
  plugins: Record<string, any>;

  /** 1. updating utilities */

  /** checks the slider's translate X value
   * @returns {number} the slider's translate X value in px */
  getTransX(): number;
  /** checks the width of each slide (each slide is assumed to have the same width)
   * @returns {number} the width of the first slide in px (margins are included) */
  calcSlideWidth(): number;
  /** get CSS property value from the element's ComputedStyle */
  getProperty(el: HTMLElement, elProp: string): number;
  /** returns the numbe of slides that are visible at the same time
   * @returns {number} the number of slides
   */
  getSlidesPerView(): number;

  /** 2. transforming utilities*/

  /** sets the container's X value to the length of one slide mulitplied by given number of slides
   * mainly used for transforming to another slide
   * It ONLY changes the slider's translate X value
   * @param {number} dist  - the desired slide */
  transform(dist: number): void;
  /** transforms the container to an absolute number of px
   * mainly used for handling touch/mouse events
   * It ONLY changes the slider's translate X value
   * @param {number} dist the desired X value in px */
  transformAbsolute(Absolutedist: number): void;
  /** sets the css transition timing with a given transition-duration
   * @param {number} dur css transition-duration in ms */
  setTransition(dur: number): void;
  /** clears the css transition timing */
  clearTransition(): void;
  /** navigate one slide to the right */
  slideNext(dur?: number): Promise<void>;
  /** navigate one slide to the left */
  slidePrev(dur?: number): Promise<void>;
  /** navigates left (negative number) or right (positive number) by a given number of slides */
  slideBy(dist: number, dur?: number): Promise<void>;
  /** navigates to a desired slide */
  slideTo(to: number, dur?: number): Promise<void>;

  /** 3.lifecycle helpers */

  init(): void;
  /** registers an event listener to the window and removes it on the destroy hook */
  addDocListener(event: string, handler: EventListener, options?: AddEventListenerOptions): void;
  /** registers an event listener to the slider's container and removes it on the destroy hook */
  addConListener(event: string, handler: EventListener, options?: AddEventListenerOptions): void;
  /** register an event listener called on the destroy hook */
  onDestroy(handler: () => void, handerId?: string): string;
  /** destroys the slider instance and:
   * - reverts CSS DOM tweaks
   * - cleans up all event listeners */
  destroy(): void;
  /** set to true once the destroy method has been called and completed
   * if true the slider is no longer functional */
  isDestroyed: boolean;
}

export const ONCE = { once: true };

export enum EVENTS {
  TR_END = "ms-transitionend",
  TR_START = "transitionstart",
  MV = "ms-moving",
  DRAG_START = "ms-pointerdragstart",
  DRAG_END = "ms-pointerdragend",
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
    destroyers: Record<string, () => void> = {};
    counter = 0;
    ismoving = false;
    isDestroyed = false;
    slideNext: (dur?: number) => Promise<void>;
    slidePrev: (dur?: number) => Promise<void>;
    slideBy: (dist?: number) => Promise<void>;
    slideTo: (to?: number) => Promise<void>;
    init: () => void;
    constructor(settings: Defaults) {
      this.settings = { ...defaults, ...settings } as Required<Defaults>;
      this.container = document.getElementById(settings.container) as HTMLElement;
      this.slides = this.container.children as HTMLCollectionOf<HTMLElement>;
      this.container.style.setProperty("--number-of-slides", this.slides.length.toString());
      this.slideWidth = this.calcSlideWidth();
      this.slideDisplay = this.getSlidesPerView();

      this.addDocListener("resize", () => {
        this.slideWidth = this.calcSlideWidth();
        this.slideDisplay = this.getSlidesPerView();
      });

      /** emit ms-transitionend event for unity */
      const transitionend = () => this.container.dispatchEvent(new CustomEvent(EVENTS.TR_END));
      this.addConListener("transitionend", transitionend);
      this.addConListener("transitioncancel", transitionend);

      /** initiate mixins */
      for (const init of this.inits) init.call(this);
      /** initiate plugins */
      for (const plugin of this.settings.plugins) this.plugins[plugin.name] = plugin.call(this);
    }

    /** 1. updating utilities */

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

    /** 2. transforming utilities*/

    transform(dist: number): void {
      this.container.style.transform = "translate3d(" + this.slideWidth * dist + "px,0,0)";
    }
    transformAbsolute(Absolutedist: number): void {
      this.container.style.transform = "translate3d(" + Absolutedist + "px,0,0)";
    }
    setTransition(dur: number) {
      this.container.style.transition = "transform " + dur + "ms " + this.settings.easing;
    }
    clearTransition() {
      this.container.style.transition = "initial";
    }

    /** 3.lifecycle helpers */

    addConListener(event: string, handler: EventListener, options?: AddEventListenerOptions): void {
      const id = this.onDestroy(() => this.container.removeEventListener(event, callback));
      const callback = (e: Event) => {
        handler(e);
        if (options?.once && this.destroyers[id]) {
          this.destroyers[id]();
          delete this.destroyers[id];
        }
      };
      this.container.addEventListener(event, callback, options);
    }
    addDocListener(event: string, handler: EventListener, options?: AddEventListenerOptions): void {
      const id = this.onDestroy(() => document.removeEventListener(event, callback));
      const callback = (e: Event) => {
        handler(e);
        if (options?.once && this.destroyers[id]) {
          this.destroyers[id]();
          delete this.destroyers[id];
        }
      };
      document.addEventListener(event, callback, options);
    }
    onDestroy(handler: () => void, handerId?: string): string {
      const id = handerId || Date.now() + "";
      this.destroyers[id] = handler;
      return id;
    }
    destroy() {
      for (const destroyer in this.destroyers) this.destroyers[destroyer]();
      this.transform(0);
      this.isDestroyed = true;
    }
  };
}
