import { Defaults } from "@/defaults";
import { MergeCtor, MixinBase } from "@/types";

export default function pagination<TBase extends MixinBase>(Base: TBase) {
  const Derived = class extends (Base as any) {
    dots: NodeListOf<HTMLElement>;
    constructor(setings: Defaults) {
      super(setings);
      const pagcontainer = document.querySelector(this.settings.pagination.container);
      const dots = document.querySelector(this.settings.pagination.dots);
      pagcontainer.innerHTML = "";

      const dotsamount = this.settings.carousel ? this.slides.length : this.slides.length - this.slideDisplay + 1;
      for (let i = 0; i < dotsamount; i++) pagcontainer.appendChild(dots.cloneNode(true));

      this.dots = document.querySelectorAll(this.settings.pagination.dots);
      this.addDotClickHandler();
      this.types[this.settings.pagination.type](this.dots[Math.abs(this.counter)]);
      this.container.addEventListener("dragStop", () => {
        this.types[this.settings.pagination.type](this.dots[Math.abs(this.counter)]);
      });
    }
    types = {
      normal: el => {
        this.dots.forEach(element => {
          element.classList.remove(this.settings.pagination.addClass);
        });
        el.classList.add(this.settings.pagination.addClass);
      },
      multiple: el => {
        this.dots.forEach(element => {
          element.classList.remove(...this.settings.pagination.addClass);
        });
        el.classList.add(this.settings.pagination.addClass[0]);
        for (let i = 0; i < this.settings.pagination.addClass.length; i++) {
          if (this.dots[this.whichdot(el) + i])
            this.dots[this.whichdot(el) + i].classList.add(this.settings.pagination.addClass[i]);
          if (this.dots[this.whichdot(el) - i])
            this.dots[this.whichdot(el) - i].classList.add(this.settings.pagination.addClass[i]);
        }
      },
    };
    whichdot(dot): number {
      for (let i = 0; i < this.dots.length; i++) if (Object.values(this.dots)[i] === dot) return i;
      return 0;
    }
    addDotClickHandler() {
      this.dots.forEach(element => {
        element.onclick = () => {
          this.slideTo(this.whichdot(element));
          this.types[this.settings.pagination.type](element);
          this.container.addEventListener("transitionend", this.addDotClickHandler.bind(this), { once: true });
          this.dots.forEach(el => {
            el.onclick = null;
          });
        };
      });
    }
  };
  return Derived as MergeCtor<typeof Derived, TBase>;
}
