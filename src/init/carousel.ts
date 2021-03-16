import { Defaults } from "@/defaults";
import { MergeCtor, MixinBase } from "@/types";

export default function carousel<TBase extends MixinBase>(Base: TBase) {
  const Derived = class Carousel extends (Base as any) {
    carousel = true;
    move = {
      for: () => {
        this.updateContainer();
        this.movedSlide = this.slides[0];
        this.container.appendChild(this.movedSlide);
      },
      back: () => {
        this.updateContainer();
        this.movedSlide = this.slides[this.slides.length - 1];
        this.container.insertBefore(this.movedSlide, this.slides[0]);
      },
    };
    constructor(props: Defaults) {
      super(props);
      if (this.slideDisplay + 2 > this.slides.length) {
        do {
          for (let i = 0, counter = this.slides.length; i < counter; i++) {
            this.container.appendChild(this.slides[i].cloneNode(true));
            this.updateContainer();
          }
        } while (this.slideDisplay + 2 > this.slides.length);
      }
      this.slidePrev(0);
      this.container.addEventListener("moving", () => {
        if (Math.abs(this.pos.start - this.getTransX()) / this.slideWidth >= 1 && this.pos.x1 != 0) {
          if (this.pos.x1 > 0) {
            this.move.for();
            this.counter++;
          } else {
            this.move.back();
            this.counter--;
          }
          this.countercheck();
          this.container.style.transform = "translateX(" + this.slideWidth * -1 + "px)";
        }
      });
    }

    countercheck() {
      if (this.counter < 0) this.counter = this.slides.length - 1;
      if (this.counter > this.slides.length - 1) this.counter = 0;
    }
    base = (direction, dur): Promise<void> =>
      new Promise(resolve => {
        this.countercheck();
        setTimeout(() => {
          this.container.style.transition = "";
          direction.call(this);
          this.container.style.transform = "translateX(" + this.slideWidth * -1 + "px)";
          resolve();
        }, dur);
      });

    slideNext(dur = this.settings.transitionSpeed): Promise<void> {
      this.counter++;
      this.container.style.transform = "translateX(" + this.slideWidth * -2 + "px)";
      this.container.style.transition = "transform " + dur + "ms";
      return this.base(this.move.for, dur);
    }
    slidePrev(dur = this.settings.transitionSpeed): Promise<void> {
      this.counter--;
      this.container.style.transform = "translateX(" + this.slideWidth * 0 + "px)";
      this.container.style.transition = "transform " + dur + "ms";
      return this.base(this.move.back, dur);
    }

    slideTo(to = 0): Promise<void> {
      return this.slideBy(to - Math.abs(this.counter));
    }
    slideBy = (dist = 0): Promise<void> =>
      new Promise<void>(resolve => {
        if (dist == 0) return;
        /** create an array of void function to run after the transition */
        const EVENTPIPE: Array<() => void> = [];
        for (let i = 0; i < Math.abs(dist); i++) {
          if (dist > 0) this.counter++;
          else this.counter--;

          if (this.counter < 0) this.counter = this.slides.length - 1;
          if (this.counter > this.slides.length - 1) this.counter = 0;
        }
        const size = this.slides.length;
        this.move.for();
        this.updateContainer();
        this.container.style.transform = "translateX(0px)";
        this.container.style.transform = "translateX(" + this.getTransX() + ")";
        /** check if DISTance is longer than the number of slides - slides per view
         * if so, clone slides so the transition look natural
         */
        if (dist > this.slides.length - this.slideDisplay) {
          do {
            for (let i = 0; i < size; i++) {
              this.container.appendChild(this.slides[i].cloneNode(true));
              this.updateContainer();
            }
          } while (dist > this.slides.length - this.slideDisplay);
          /** remove cloned slides after transition */
          EVENTPIPE.push(() => {
            do {
              this.container.removeChild(this.slides[this.slides.length - 1]);
              this.updateContainer();
            } while (size < this.slides.length);
          });
        }
        /** the logic of the transition itself */
        if (dist < 0) {
          /** go left */
          do {
            for (let i = 0; i < size; i++) {
              this.container.appendChild(this.slides[i].cloneNode(true));
              this.updateContainer();
            }
          } while (Math.abs(dist) > this.slides.length - this.slideDisplay);
          this.container.style.left = (this.slides.length - size) * -1 * this.slideWidth + "px";
          this.container.style.transform = "translateX(" + this.getTransX() + ")";
          EVENTPIPE.push(() => {
            do {
              this.container.removeChild(this.slides[this.slides.length - 1]);
              this.updateContainer();
            } while (size < this.slides.length);
            this.container.style.left = "0px";
            for (let i = 0; i < Math.abs(dist) + 1; i++) {
              this.move.back();
            }
            this.container.style.transform = "translateX(" + -1 * this.slideWidth + "px)";
          });
        } else {
          /** go right */
          EVENTPIPE.push(() => {
            for (let i = 0; i < dist - 1; i++) {
              this.move.for();
            }
          });
        }
        this.container.style.transition = "transform " + this.settings.transitionSpeed + "ms";
        this.container.style.transform = "translateX(" + dist * -1 * this.slideWidth + "px)";
        this.container.addEventListener(
          "transitionend",
          () => {
            for (const listener of EVENTPIPE) listener();
            this.container.style.transition = "";
            this.container.style.transform = "translateX(" + -1 * this.slideWidth + "px)";
            resolve();
          },
          { once: true }
        );
      });
  };
  return Derived as MergeCtor<typeof Derived, TBase>;
}
