import { EVENTS, type SliderI } from "@/types";
import { SliderBase } from "@/base";

export default class Noloop extends SliderBase implements SliderI {
    protected init() {
        return this.base(this.settings.initialSlide, 0);
    }

    public getCurrentSlide(): number {
        return this.counter * -1;
    }

    private base(dist: number, dur = this.settings.transitionSpeed): Promise<void> {
        return new Promise(resolve => {
            if (this.isMoving) return resolve();

            this.isMoving = true;
            this.counter -= dist;
            if (this.counter > 0) this.counter = 0;
            if (this.counter < -1 * (this.slides.length - this.slideDisplay))
                this.counter = -1 * (this.slides.length - this.slideDisplay);

            this.setTransition(dur);
            this.transform(this.counter);
            const callback = () => {
                this.clearTransition();
                this.isMoving = false;
                this.pos.start = this.getTransX();
                this.container.dispatchEvent(new CustomEvent(EVENTS.TR_END));
                resolve();
            };

            if (dur !== 0) setTimeout(() => callback(), dur);
            else callback();
        });
    }

    slideNext(dur = this.settings.transitionSpeed): Promise<void> {
        return this.base(Math.ceil((this.pos.start - this.getTransX()) / this.slideWidth) || 1, dur);
    }

    slidePrev(dur = this.settings.transitionSpeed): Promise<void> {
        return this.base(Math.floor((this.pos.start - this.getTransX()) / this.slideWidth) || -1, dur);
    }

    slideTo(to = 0, dur?: number): Promise<void> {
        return this.slideBy(to - Math.abs(this.counter), dur);
    }

    slideBy(dist = 0, dur?: number): Promise<void> {
        if (dist === 0) return new Promise<void>(resolve => resolve());
        return this.base(dist, dur);
    }

    goTo(dist = 0): Promise<void> {
        return this.slideTo(dist, 0);
    }
}
