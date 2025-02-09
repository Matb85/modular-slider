import type { Defaults, SliderI } from "@/types";
import { defaults, ONCE } from "@/types";

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
        goTo: (dist?: number) => Promise<void>;
        slideTo: (to?: number) => Promise<void>;
        init: () => void;
        getCurrentSlide: () => number;
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
            return !isNaN(slidesPerView)
                ? slidesPerView
                : this.getProperty(document.documentElement, "--slides-per-view");
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

        addTempConListener(event: string, name: string, handler: EventListener): void {
            this.onDestroy(() => this.container.removeEventListener(event, handler), name);
            this.container.addEventListener(event, handler, ONCE);
        }
        addConListener(event: string, handler: EventListener): void {
            this.onDestroy(() => this.container.removeEventListener(event, handler));
            this.container.addEventListener(event, handler);
        }
        addDocListener(event: string, handler: EventListener): void {
            this.onDestroy(() => document.removeEventListener(event, handler));
            document.addEventListener(event, handler);
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
