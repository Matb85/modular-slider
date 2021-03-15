import { Defaults } from "@/defaults";
import { MergeCtor, MixinBase } from "@/types";

export default function carousel<TBase extends MixinBase>(Base: TBase) {
  const Derived = class Carousel extends (Base as any) {
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
    ending(direction, dur) {
      this.countercheck();
      setTimeout(() => {
        this.container.style.transition = "";
        direction.call(this);
        this.container.style.transform = "translateX(" + this.slideWidth * -1 + "px)";
      }, dur);
    }
    slideNext(dur = this.settings.transitionSpeed) {
      this.counter++;
      this.container.style.transform = "translateX(" + this.slideWidth * -2 + "px)";
      console.log(this.settings.transitionSpeed);
      this.container.style.transition = "transform " + dur + "ms";
      this.ending(this.move.for, dur);
    }
    slidePrev(dur = this.settings.transitionSpeed) {
      this.counter--;
      this.container.style.transform = "translateX(" + this.slideWidth * 0 + "px)";
      this.container.style.transition = "transform " + dur + "ms";
      this.ending(this.move.back, dur);
    }

    slideTo(to = 0) {
      this.slideBy(to - Math.abs(this.counter));
    }
    slideBy(dist = 0) {
      if (dist == 0) return;
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
      if (dist > this.slides.length - this.slideDisplay) {
        do {
          for (let i = 0; i < size; i++) {
            this.container.appendChild(this.slides[i].cloneNode(true));
            this.updateContainer();
          }
        } while (dist > this.slides.length - this.slideDisplay);
        this.container.addEventListener(
          "transitionend",
          () => {
            do {
              this.container.removeChild(this.slides[this.slides.length - 1]);
              this.updateContainer();
            } while (size < this.slides.length);
          },
          { once: true }
        );
      }
      if (dist < 0) {
        do {
          for (let i = 0; i < size; i++) {
            this.container.appendChild(this.slides[i].cloneNode(true));
            this.updateContainer();
          }
        } while (Math.abs(dist) > this.slides.length - this.slideDisplay);
        this.container.style.left = (this.slides.length - size) * -1 * this.slideWidth + "px";
        this.container.style.transform = "translateX(" + this.getTransX() + ")";
        this.container.addEventListener(
          "transitionend",
          () => {
            do {
              this.container.removeChild(this.slides[this.slides.length - 1]);
              this.updateContainer();
            } while (size < this.slides.length);
            this.container.style.left = "0px";
            for (let i = 0; i < Math.abs(dist) + 1; i++) {
              this.move.back();
            }
            this.container.style.transform = "translateX(" + -1 * this.slideWidth + "px)";
          },
          { once: true }
        );
      } else {
        this.container.addEventListener(
          "transitionend",
          () => {
            for (let i = 0; i < dist - 1; i++) {
              this.move.for();
            }
          },
          { once: true }
        );
      }
      this.container.style.transition = "transform " + this.settings.transitionSpeed + "ms";
      this.container.style.transform = "translateX(" + dist * -1 * this.slideWidth + "px)";
      this.container.addEventListener(
        "transitionend",
        () => {
          this.container.style.transition = "";
          this.container.style.transform = "translateX(" + -1 * this.slideWidth + "px)";
        },
        { once: true }
      );
    }
  };

  return Derived as MergeCtor<typeof Derived, TBase>;
}
