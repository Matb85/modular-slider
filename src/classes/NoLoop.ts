import { EVENTS, type SliderI } from "@/types";
import { SliderBase } from "@/classes/SliderBase";

export class NoLoop extends SliderBase implements SliderI {
    protected init() {}

    public getCurrentSlide(): number {
        return this.counter * -1;
    }

    private base(dist: number, dur = this.settings.transitionSpeed): Promise<void> {
        return new Promise(resolve => {
            if (this.isMoving) return resolve();

            this.isMoving = true;
            this.counter -= dist;
            if (this.counter > 0) this.counter = 0;
            if (this.counter < -1 * (this.slides.length - this.slidesPerView))
                this.counter = -1 * (this.slides.length - this.slidesPerView);

            this.setTransition(dur);
            this.transform(this.counter);
            const callback = () => {
                this.clearTransition();
                this.isMoving = false;
                this.pos.start = this.getTransX();
                this.dispatchEvent(EVENTS.TR_END);
                resolve();
            };

            if (dur !== 0) setTimeout(() => callback(), dur);
            else callback();
        });
    }

    public slideNext(dur = this.settings.transitionSpeed): Promise<void> {
        return this.base(Math.ceil((this.pos.start - this.getTransX()) / this.slideWidth) || 1, dur);
    }

    public slidePrev(dur = this.settings.transitionSpeed): Promise<void> {
        return this.base(Math.floor((this.pos.start - this.getTransX()) / this.slideWidth) || -1, dur);
    }

    public slideTo(to = 0, dur?: number): Promise<void> {
        return this.slideBy(to - Math.abs(this.counter), dur);
    }

    public slideBy(dist = 0, dur?: number): Promise<void> {
        if (dist === 0) return new Promise<void>(resolve => resolve());
        return this.base(dist, dur);
    }

    public goTo(dist = 0): Promise<void> {
        return this.slideTo(dist, 0);
    }
}
