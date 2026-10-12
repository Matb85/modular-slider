import { type Defaults, EVENTS, type SliderI } from "@/types";
import { defaults, ONCE } from "@/types";

/**
 * the base class
 */
export abstract class SliderBase implements SliderI {
    public carousel: boolean;
    public counter = 0;
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

    /** the container's translate X value in px, kept here so it never has to be read back from the DOM */
    protected transX = 0;
    /** set when a resize happens during a transition or a drag, they rely on the old dimensions */
    private pendingRefresh = false;
    private destroyerId = 0;

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

        this.init();

        /** initiate plugins */
        for (const plugin of this.settings.plugins) this.plugins[plugin.name] = plugin.call(this);

        this.goTo(this.settings.initialSlide);

        const refreshIfPending = () => {
            if (this.pendingRefresh && !this.isMoving) this.refresh();
        };
        this.addConListener(EVENTS.TR_END, refreshIfPending);
        this.addConListener(EVENTS.DRAG_END, refreshIfPending);
        const observer = new ResizeObserver(() => this.refresh());
        observer.observe(this.container.parentElement as HTMLElement);
        observer.observe(this.slides[0]);
        this.onDestroy(() => observer.disconnect());
    }

    /** 1. updating utilities */

    public getTransX(): number {
        return this.transX;
    }

    public getProperty(el: HTMLElement, elProp: string): number {
        return parseInt(window.getComputedStyle(el).getPropertyValue(elProp));
    }

    public calcSlideWidth(): number {
        /** fractions of a pixel are kept, otherwise the error grows with every slide */
        const style = window.getComputedStyle(this.slides[0]);
        return (
            this.slides[0].getBoundingClientRect().width + parseFloat(style.marginLeft) + parseFloat(style.marginRight)
        );
    }

    public getSlidesPerView(): number {
        const slidesPerView = this.getProperty(this.container.parentElement as HTMLElement, "--slides-per-view");
        return !isNaN(slidesPerView) ? slidesPerView : this.getProperty(document.documentElement, "--slides-per-view");
    }

    public refresh(): void {
        if (this.isDestroyed) return;
        if (this.isMoving) {
            this.pendingRefresh = true;
            return;
        }
        this.pendingRefresh = false;

        const slideWidth = this.calcSlideWidth();
        const slidesPerView = this.getSlidesPerView();
        if (slideWidth === this.slideWidth && slidesPerView === this.slidesPerView) return;
        this.slideWidth = slideWidth;
        this.slidesPerView = slidesPerView;

        this.clearTransition();
        this.realign();
        this.dispatchEvent(EVENTS.RESIZE);
    }

    /** 2. transforming utilities*/

    public transform(dist: number): void {
        this.transformAbsolute(this.slideWidth * dist);
    }

    public transformAbsolute(absoluteDist: number): void {
        this.transX = absoluteDist;
        this.container.style.transform = "translate3d(" + absoluteDist + "px,0,0)";
    }

    public setTransition(dur: number) {
        this.container.style.transition = "transform " + dur + "ms " + this.settings.easing;
    }

    public clearTransition() {
        this.container.style.transition = "initial";
    }

    /** puts the slider back in its place after its dimensions have changed */
    protected realign(): void {
        this.transform(this.counter);
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
        const id = handlerId || "MS-" + this.destroyerId++;
        this.destroyers[id] = handler;
        return id;
    }

    public destroy() {
        for (const destroyer in this.destroyers) this.destroyers[destroyer]();
        this.transform(0);
        this.isDestroyed = true;
    }
}
