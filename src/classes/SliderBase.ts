import { type Defaults, EVENTS, type SliderI } from "@/types";
import { defaults, ONCE } from "@/types";

/**
 * the base class
 */
export abstract class SliderBase implements SliderI {
    public carousel: boolean;
    public settings: Required<Defaults>;
    public container: HTMLElement;
    public slides: HTMLCollectionOf<HTMLElement>;
    public pos = { start: 0, x1: 0, x2: 0, y1: 0, y2: 0 };
    public plugins: Record<string, any> = {};
    public destroyers: Record<string, () => void> = {};
    public isMoving = false;
    public isDestroyed = false;

    public slideWidth: number;
    public slidesPerView: number;

    protected counter = 0;

    public abstract slideNext(dur?: number): Promise<void>;

    public abstract slidePrev(dur?: number): Promise<void>;

    public abstract slideBy(dist?: number): Promise<void>;

    public abstract goTo(dist?: number): Promise<void>;

    public abstract slideTo(to?: number): Promise<void>;

    public abstract getCurrentSlide(): number;

    protected abstract init(): void;

    constructor(settings: Defaults) {
        this.settings = { ...defaults, ...settings } as Required<Defaults>;
        this.container = document.getElementById(settings.container) as HTMLElement;
        this.slides = this.container.children as HTMLCollectionOf<HTMLElement>;
        this.container.style.setProperty("--number-of-slides", this.slides.length.toString());
        this.slideWidth = this.calcSlideWidth();
        this.slidesPerView = this.getSlidesPerView();
        this.addDocListener("resize", () => {
            this.slideWidth = this.calcSlideWidth();
            this.slidesPerView = this.getSlidesPerView();
        });

        this.init();

        /** initiate plugins */
        for (const plugin of this.settings.plugins) this.plugins[plugin.name] = plugin.call(this);

        this.goTo(this.settings.initialSlide);
    }

    /** 1. updating utilities */

    public getTransX(): number {
        return parseFloat(window.getComputedStyle(this.container).transform.split(", ")[4]);
    }

    public getProperty(el: HTMLElement, elProp: string): number {
        return parseInt(window.getComputedStyle(el).getPropertyValue(elProp));
    }

    public calcSlideWidth(): number {
        return (
            this.slides[0].offsetWidth +
            this.getProperty(this.slides[0], "margin-left") +
            this.getProperty(this.slides[0], "margin-right")
        );
    }

    public getSlidesPerView(): number {
        const slidesPerView = this.getProperty(this.container.parentElement as HTMLElement, "--slides-per-view");
        return !isNaN(slidesPerView) ? slidesPerView : this.getProperty(document.documentElement, "--slides-per-view");
    }

    /** 2. transforming utilities*/

    public transform(dist: number): void {
        this.container.style.transform = "translate3d(" + this.slideWidth * dist + "px,0,0)";
    }

    public transformAbsolute(absoluteDist: number): void {
        this.container.style.transform = "translate3d(" + absoluteDist + "px,0,0)";
    }

    public setTransition(dur: number) {
        this.container.style.transition = "transform " + dur + "ms " + this.settings.easing;
    }

    public clearTransition() {
        this.container.style.transition = "initial";
    }

    /** 3.lifecycle helpers */
    public dispatchEvent(event: EVENTS): void {
        this.container.dispatchEvent(new CustomEvent(event));
    }

    public addTempConListener(event: string, name: string, handler: EventListener): void {
        this.onDestroy(() => this.container.removeEventListener(event, handler), name);
        this.container.addEventListener(event, handler, ONCE);
    }

    public addConListener(event: string, handler: EventListener): void {
        this.onDestroy(() => this.container.removeEventListener(event, handler));
        this.container.addEventListener(event, handler);
    }

    public addDocListener(event: string, handler: EventListener): void {
        this.onDestroy(() => document.removeEventListener(event, handler));
        document.addEventListener(event, handler);
    }

    public onDestroy(handler: () => void, handlerId?: string): string {
        const id = handlerId || Date.now() + "";
        this.destroyers[id] = handler;
        return id;
    }

    public destroy() {
        for (const destroyer in this.destroyers) this.destroyers[destroyer]();
        this.transform(0);
        this.isDestroyed = true;
    }
}
