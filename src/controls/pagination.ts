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
      this.updatePagination(this.dots[Math.abs(this.counter)]);
      this.container.addEventListener("dragStop", () => {
        this.updatePagination(this.dots[Math.abs(this.counter)]);
      });
    }
    updatePagination(dot) {
      const dotID = parseInt(dot.dataset.id);
      this.dots.forEach(element => {
        element.classList.remove(...this.settings.pagination.addClass);
      });
      dot.classList.add(this.settings.pagination.addClass[0]);
      if (this.settings.pagination.addClass[1])
        for (let i = 0; i < this.settings.pagination.addClass.length; i++) {
          if (this.dots[dotID + i]) this.dots[dotID + i].classList.add(this.settings.pagination.addClass[i]);
          if (this.dots[dotID - i]) this.dots[dotID - i].classList.add(this.settings.pagination.addClass[i]);
        }
    }
    addDotClickHandler() {
      this.dots.forEach(d => {
        d.onclick = () => {
          this.slideTo(d.dataset.id);
          this.updatePagination(d);
          this.container.addEventListener("transitionend", this.addDotClickHandler.bind(this), {
            once: true,
          });
        };
      });
    }
  };
  return Derived as MergeCtor<typeof Derived, TBase>;
}
