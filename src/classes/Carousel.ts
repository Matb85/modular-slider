import { EVENTS, type SliderI } from "@/types";
import { SliderBase } from "@/classes/SliderBase";

/** utilities specific to this mixin */
export class Carousel extends SliderBase implements SliderI {
    /** the translate X value last applied to each slide, used for skipping the writes that change nothing
     * assigned in init() - the base constructor calls it before the field initializers of this class would run */
    declare private slideOffsets: number[];

    public getCurrentSlide(): number {
        if (this.counter <= 0) return this.counter * -1;
        else return this.slides.length - this.counter;
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

    public slideBy(
        this: Carousel,
        dist = 0,
        dur = this.settings.transitionSpeed * (Math.abs(dist) / this.slides.length + 1),
    ): Promise<void> {
        if (Math.abs(dist) == 1) return this.base(dist, dur);

        return new Promise(resolve => {
            /** an "early" return to avoid unnecessary burden if dist equals 0 or 1 */
            if (dist === 0 || this.isMoving) {
                this.dispatchEvent(EVENTS.TR_END);
                return resolve();
            }

            this.isMoving = true;
            /** mock some touchEvent/mouseEvent data */
            this.pos.x1 = dist;
            this.pos.start = this.getTransX();
            /** mock the "moving" event usually fired by the touchmove/mousemove handler */
            let startTime: number;
            let oldProgress = 0;
            /** the number of slides that have been aligned on the way */
            let steps = 0;
            /** based on https://medium.com/burst/understanding-animation-with-duration-and-easing-using-requestanimationframe-7e3fd1688d6c
             * it is supposed to mock the touch/mouse move event
             */
            const animate = (timestamp: number) => {
                if (this.isDestroyed) return resolve();
                if (!startTime) startTime = timestamp;
                /** How much has the animation progressed? From 0 to 1
                 * it must not exceed 1 - the easing turns back there and the animation would never arrive */
                const t = dur > 0 ? Math.min(1, (timestamp - startTime) / dur) : 1;

                const progress = this.slideWidth * dist * this.easeInOutQuad(t);
                this.transformAbsolute(this.getTransX() - progress + oldProgress);
                oldProgress = progress;

                steps += this.alignSlides();
                this.dispatchEvent(EVENTS.MV);

                if (t < 1) window.requestAnimationFrame(animate);
                else {
                    /** align the slides that are left & land exactly on the desired slide */
                    for (; steps < Math.abs(dist); steps++) this.updateSlides(dist > 0 ? 1 : -1);
                    this.transform(this.counter);

                    this.isMoving = false;
                    this.dispatchEvent(EVENTS.TR_END);

                    resolve();
                }
            };

            window.requestAnimationFrame(animate);
        });
    }

    public goTo(to: number): Promise<void> {
        return new Promise(resolve => {
            /** "early" return if dist === 0  */
            if (this.isMoving || this.getCurrentSlide() === to) return resolve();

            this.pos.start = this.getTransX();
            this.transform(-1 * to);
            this.updateSlides(this.counter + to);

            this.dispatchEvent(EVENTS.TR_END);
            resolve();
        });
    }

    /** essential logic & methods */
    protected async init() {
        this.carousel = true;
        this.slideOffsets = [];
        this.addConListener(EVENTS.MV, () => this.alignSlides());

        this.transform(0);
        /** move the last slide to the left */
        this.translateSlide(this.slides.length - 1, -1);

        /** return to the initial state when destroying */
        this.onDestroy(() => {
            for (let i = 0; i < this.slides.length; i++) this.translateSlide(i, 0);
        });
    }

    protected realign() {
        this.transform(this.counter);
        this.updateSlides(0);
        this.pos.start = this.getTransX();
    }

    /** aligns the slides while the container is being moved by a pointer or an animation
     * @returns the number of slides the slider has been aligned by */
    private alignSlides(): number {
        let steps = 0;
        while (this.slideWidth > 0 && Math.abs(this.pos.start - this.getTransX()) >= this.slideWidth) {
            this.updateSlides(this.pos.start > this.getTransX() ? 1 : -1);
            /** continue from the slide that has just been aligned, what is left of the translation is kept */
            this.pos.start = this.slideWidth * this.counter;
            steps++;
        }
        return steps;
    }

    /** How much has our animation progressed relative to our duration goal?
     * The result is a number (float) between 0 and 1. So 0 is 0% and 1 is 100%. */
    private easeInOutQuad(x: number): number {
        return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
    }

    private translateSlide(slideIndex: number, translateFactor: number) {
        const x = this.slideWidth * this.slides.length * translateFactor;
        if (this.slideOffsets[slideIndex] === x) return;
        this.slideOffsets[slideIndex] = x;
        this.slides[slideIndex].style.transform = `translate3d(${x}px, 0, 0)`;
    }

    private updateSlides(dist: number) {
        this.counter -= dist;

        /** prevent the counter from exceeding the number of slides */
        if (this.counter < -1 * this.slides.length + 1 || this.counter >= this.slides.length) {
            const fullWidth = this.slideWidth * this.slides.length;
            this.transformAbsolute(this.counter > 0 ? this.getTransX() - fullWidth : this.getTransX() + fullWidth);
            this.counter = 0;
        }
        const c = Math.abs(this.counter);
        let shouldMove = true;
        if (this.counter < 0) {
            for (let i = 0; i < this.slides.length; i++) {
                if (i == c - 1) shouldMove = false;
                this.translateSlide(i, shouldMove ? 1 : 0);
            }
        } else {
            for (let i = this.slides.length - 1; i >= 0; i--) {
                if (i == this.slides.length - 2 - c) shouldMove = false;
                this.translateSlide(i, shouldMove ? -1 : 0);
            }
        }
    }

    private base(dist: number, dur: number): Promise<void> {
        return new Promise(resolve => {
            if (this.isMoving) return resolve();
            this.isMoving = true;

            this.setTransition(dur);
            this.transform(this.counter - dist);

            setTimeout(() => {
                if (this.isDestroyed) return resolve();
                this.clearTransition();
                this.updateSlides(dist);
                this.isMoving = false;
                this.dispatchEvent(EVENTS.TR_END);
                resolve();
            }, dur);
        });
    }
}
