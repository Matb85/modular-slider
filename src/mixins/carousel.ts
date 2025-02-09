import { EVENTS, type SliderI } from "@/types";
import { SliderBase } from "@/base";

/** utilities specific to this mixin */
export default class Carousel extends SliderBase implements SliderI {
    public getCurrentSlide(): number {
        if (this.counter <= 0) return this.counter * -1;
        else return this.slides.length - this.counter;
    }

    private updateDOM(dist: number) {
        this.counter -= dist;

        /** prevent the counter from exceeding the number of slides */
        if (this.counter < -1 * this.slides.length + 1 || this.counter >= this.slides.length) {
            this.counter = 0;
            this.transform(0);
        }
        const c = Math.abs(this.counter);
        let shouldMove = true;
        if (this.counter < 0) {
            for (let i = 0; i < this.slides.length; i++) {
                if (i == c - 1) shouldMove = false;
                this.slides[i].style.setProperty("--translate-factor", shouldMove ? "1" : "0");
            }
        } else {
            for (let i = this.slides.length - 1; i >= 0; i--) {
                if (i == this.slides.length - 2 - c) shouldMove = false;
                this.slides[i].style.setProperty("--translate-factor", shouldMove ? "-1" : "0");
            }
        }
    }
    /** essential logic & methods */
    public async init() {
        const moving = () => {
            /** run only if the translation of the container is:
             *  bigger or equal to the width of one slide (including its left and right margin)
             * uses an early return to avoid too much nested code*/
            if (Math.abs(this.pos.start - this.getTransX()) / this.slideWidth < 1) return;
            /** align the slides according to the direction */

            if (this.pos.x1 > 0) {
                this.updateDOM(1);
            } else {
                this.updateDOM(-1);
            }
            /** reset the "relative translation" so the condition at the beginning works correctly */
            this.pos.start = this.getTransX();
        };
        this.addConListener(EVENTS.MV, moving);

        /** append or insertBefore a slide when swiping so the transition does not have any gaps */
        this.transform(0);
        // await this.slideTo(this.settings.initialSlide);
        this.slides[this.slides.length - 1].style.setProperty("--translate-factor", "-1");

        /** return to the initial state when destroying */
        this.onDestroy(() => {
            for (const slide of this.slides) slide.style.setProperty("--translate-factor", "0");
        });
    }

    private base(dist: number, dur: number): Promise<void> {
        return new Promise(resolve => {
            if (this.isMoving) return resolve();
            this.isMoving = true;

            this.setTransition(dur);
            this.transform(this.counter - dist);

            setTimeout(() => {
                this.clearTransition();
                this.updateDOM(dist);
                this.isMoving = false;
                this.container.dispatchEvent(new CustomEvent(EVENTS.TR_END));
                resolve();
            }, dur);
        });
    }

    public slideNext(dur = this.settings.transitionSpeed): Promise<void> {
        return this.base(1, dur);
    }

    public slidePrev(dur = this.settings.transitionSpeed): Promise<void> {
        return this.base(-1, dur);
    }

    public slideTo(to = 0, dur?: number): Promise<void> {
        return this.slideBy(to - this.getCurrentSlide(), dur);
    }

    private easeInOutQuad(x: number): number {
        return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
    }

    public slideBy(
        this: Carousel,
        dist = 0,
        dur = this.settings.transitionSpeed * (Math.abs(dist) / this.slides.length + 1),
    ): Promise<void> {
        if (Math.abs(dist) == 1) return this.base(dist, dur);

        return new Promise(resolve => {
            /** an "early" return to avoid unnecessary burden if dist equals 0 or 1 */
            if (dist === 0 || this.isMoving) {
                this.container.dispatchEvent(new CustomEvent(EVENTS.TR_END));
                return resolve();
            }

            this.isMoving = true;
            /** mock some touchEvent/mouseEvent data */
            this.pos.x1 = dist;
            this.pos.start = this.getTransX();
            /** mock the "moving" event usually fired by the touchmove/mousemove handler */
            let starttime: number;
            let oldProgress = 0;
            /** based on https://medium.com/burst/understanding-animation-with-duration-and-easing-using-requestanimationframe-7e3fd1688d6c
             * it is supposed to mock the touch/mouse move event
             */
            const animate = (timestamp: number) => {
                if (!starttime) starttime = timestamp;
                /** How long have we been animating in total? */
                const runtime = timestamp - starttime;
                /** How much has our animation progressed relative to our duration goal?
                 * The result is a number (float) between 0 and 1. So 0 is zero percent en 1 is one hundred percent. */
                const relativeProgress = this.slideWidth * dist * this.easeInOutQuad(runtime / dur);
                this.transformAbsolute(this.getTransX() - relativeProgress + oldProgress);
                oldProgress = relativeProgress;

                this.container.dispatchEvent(new CustomEvent(EVENTS.MV));
                if (runtime < dur) window.requestAnimationFrame(animate);
                else {
                    this.updateDOM(dist > 0 ? 1 : -1);

                    this.isMoving = false;
                    this.container.dispatchEvent(new CustomEvent(EVENTS.TR_END));
                    resolve();
                }
            };

            window.requestAnimationFrame(animate);
        });
    }

    goTo(to: number): Promise<void> {
        return new Promise(resolve => {
            /** an "early" return to avoid unnecessary burden if dist == 0 */
            if (this.isMoving) return resolve();

            this.pos.start = this.getTransX();
            this.transform(-1 * to);
            this.updateDOM(this.counter + to);

            this.container.dispatchEvent(new CustomEvent(EVENTS.TR_END));
            resolve();
        });
    }
}

