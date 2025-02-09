/**
 * Defaults
 */
export const defaults = {
    easing: "ease",
    container: "",
    transitionSpeed: 300,
    initialSlide: 0,
    plugins: [],
};

type RequiredBy<K, T extends keyof K> = Omit<Partial<K>, "plugins"> & Pick<K, T> & { plugins: Array<() => void> };
export type Defaults = RequiredBy<typeof defaults, "container">;

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
    isMoving: boolean;
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
    /** returns the number of the current slide
     * @returns {number} from 0 to numberOfSlides - 1
     */
    getCurrentSlide(): number;
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
    /** **immediately** navigates to a desired slide */
    goTo(to: number): Promise<void>;

    /** 3.lifecycle helpers */

    /** registers a listener that fires only ONCE, used for transitions */
    addTempConListener(event: string, name: string, handler: EventListener): void;
    /** registers an event listener to the slider's container and removes it on the destroy hook */
    addConListener(event: string, handler: EventListener): void;
    /** registers an event listener to the window and removes it on the destroy hook */
    addDocListener(event: string, handler: EventListener): void;
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
    TR_END = "MS-transitionend",
    TR_START = "transitionstart",
    MV = "MS-moving",
    DRAG_START = "MS-pointerdragstart",
    DRAG_END = "MS-pointerdragend",
}
