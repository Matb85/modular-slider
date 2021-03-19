import type { Defaults } from "@/defaults";
import type { Slider, PositionStore } from "@/base";

export default abstract class implements Slider {
  movedSlide: HTMLElement;
  container: HTMLElement;
  slides: HTMLCollectionOf<HTMLElement>;
  slideDisplay: number;
  settings: Required<Defaults>;
  pos: PositionStore;
  slideWidth: number;
  counter: number;
  plugins: Record<string, any>;
  carousel: boolean;
  static carousel = true;
  abstract getTransX(): number;
  abstract calcslideWidth(): number;
  abstract updateContainer(): void;
  abstract transform(dist: number): void;

  movefor() {
    this.updateContainer();
    this.movedSlide = this.slides[0];
    this.container.appendChild(this.movedSlide);
  }
  moveback() {
    this.updateContainer();
    this.movedSlide = this.slides[this.slides.length - 1];
    this.container.insertBefore(this.movedSlide, this.slides[0]);
  }

  init() {
    if (this.slideDisplay + 2 > this.slides.length) {
      do {
        for (let i = 0, counter = this.slides.length; i < counter; i++) {
          this.container.appendChild(this.slides[i].cloneNode(true));
          this.updateContainer();
        }
      } while (this.slideDisplay + 2 > this.slides.length);
    }
    this.container.addEventListener("moving", () => {
      if (Math.abs(this.pos.start - this.getTransX()) / this.slideWidth >= 1 && this.pos.x1 != 0) {
        if (this.pos.x1 > 0) {
          this.movefor();
          this.counter++;
        } else {
          this.moveback();
          this.counter--;
        }
        this.countercheck();
        this.container.style.transform = "translateX(" + this.slideWidth * -1 + "px)";
      }
    });
    this.slidePrev(0);
  }

  countercheck() {
    if (this.counter < 0) this.counter = this.slides.length - 1;
    if (this.counter > this.slides.length - 1) this.counter = 0;
  }
  base(direction, dur): Promise<void> {
    return new Promise(resolve => {
      this.countercheck();
      setTimeout(() => {
        this.container.style.transition = "";
        direction.call(this);
        this.container.style.transform = "translateX(" + this.slideWidth * -1 + "px)";
        resolve();
      }, dur);
    });
  }

  slideNext(dur = this.settings.transitionSpeed): Promise<void> {
    this.counter++;
    this.container.style.transform = "translateX(" + this.slideWidth * -2 + "px)";
    this.container.style.transition = "transform " + dur + "ms";
    return this.base(this.movefor, dur);
  }
  slidePrev(dur = this.settings.transitionSpeed): Promise<void> {
    this.counter--;
    this.container.style.transform = "translateX(" + this.slideWidth * 0 + "px)";
    this.container.style.transition = "transform " + dur + "ms";
    return this.base(this.moveback, dur);
  }

  slideTo(to = 0): Promise<void> {
    return this.slideBy(to - Math.abs(this.counter));
  }
  slideBy(dist = 0): Promise<void> {
    return new Promise<void>(resolve => {
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
      this.movefor();
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
            this.moveback();
          }
          this.container.style.transform = "translateX(" + -1 * this.slideWidth + "px)";
        });
      } else {
        /** go right */
        EVENTPIPE.push(() => {
          for (let i = 0; i < dist - 1; i++) {
            this.movefor();
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
  }
}
