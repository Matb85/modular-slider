import { Defaults } from "@/defaults";
import { MergeCtor, MixinBase } from "@/types";

export default function pagination<TBase extends MixinBase>(Base: TBase) {
  const Derived = class extends (Base as any) {
    dots: Array<HTMLElement> = [];
    constructor(setings: Defaults) {
      super(setings);
      const pagcontainer = document.querySelector(this.settings.pagination.container);
      const dots = document.querySelector(this.settings.pagination.dots) as HTMLElement;
      pagcontainer.innerHTML = "";

      const dotsamount = this.carousel ? this.slides.length : this.slides.length - this.slideDisplay + 1;
      console.log(this.slides.length);
      for (let i = 0; i < dotsamount; i++) {
        const node = dots.cloneNode(true) as HTMLElement;
        console.dir(node);
        node.dataset.id = i.toString();
        pagcontainer.appendChild(node);
        this.dots.push(node);
      }
      this.addDotClickHandler();
      this.updatePagination();
      this.container.addEventListener("dragStop", () => {
        this.updatePagination();
      });
    }
    updatePagination() {
      const curdot = this.dots[Math.abs(this.counter)];
      const curdotID = parseInt(curdot.dataset.id as string);
      this.dots.forEach(d => {
        d.classList.remove(...this.settings.pagination.addClass);
      });
      curdot.classList.add(this.settings.pagination.addClass[0]);
      /** if the user provided more class, apply them to the neighboring dots */
      if (this.settings.pagination.addClass[1])
        for (let i = 0; i < this.settings.pagination.addClass.length; i++) {
          if (this.dots[curdotID + i]) this.dots[curdotID + i].classList.add(this.settings.pagination.addClass[i]);
          if (this.dots[curdotID - i]) this.dots[curdotID - i].classList.add(this.settings.pagination.addClass[i]);
        }
    }
    addDotClickHandler() {
      this.dots.forEach(d => {
        d.onclick = async () => {
          this.updatePagination();
          await this.slideTo(d.dataset.id);
          this.addDotClickHandler.bind(this);
        };
      });
    }
  };
  return Derived as MergeCtor<typeof Derived, TBase>;
}
