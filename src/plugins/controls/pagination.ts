import type { SliderI } from "@/base";

interface Options {
  container: string;
  dots: string;
  addClass: string[];
}

export default (options: Options) =>
  function pagination(this: SliderI) {
    const pagcontainer = document.querySelector(options.container) as HTMLElement;
    const dots = [document.querySelector(options.dots) as HTMLElement];
    dots[0].dataset.id = "0";
    const dotsamount = this.carousel ? this.slides.length : this.slides.length - this.slideDisplay + 1;
    for (let i = 1; i < dotsamount; i++) {
      const node = dots[0].cloneNode(true) as HTMLElement;
      node.dataset.id = i.toString();
      pagcontainer.appendChild(node);
      dots.push(node);
    }
    addDotClickHandler.call(this);
    updatePagination.call(this);
    this.container.addEventListener("transitionend", () => {
      updatePagination.call(this);
    });

    function updatePagination(this: SliderI) {
      const curdot = dots[Math.abs(this.counter)];
      const curdotID = parseInt(curdot.dataset.id as string);
      dots.forEach(d => d.classList.remove(...options.addClass));
      curdot.classList.add(options.addClass[0]);
      /** if the user provided more classes, apply them to neighboring dots */
      if (options.addClass[1])
        for (let i = 0; i < options.addClass.length; i++) {
          if (dots[curdotID + i]) dots[curdotID + i].classList.add(options.addClass[i]);
          if (dots[curdotID - i]) dots[curdotID - i].classList.add(options.addClass[i]);
        }
    }
    function addDotClickHandler(this: SliderI) {
      dots.forEach(d => {
        d.onclick = async () => {
          await this.slideTo(parseInt(d.dataset.id as string));
          addDotClickHandler.call(this);
          updatePagination.call(this);
        };
      });
    }
    /** remove excessive dots when destroying */
    this.container.addEventListener(
      "destroy",
      () => {
        pagcontainer.innerHTML = "";
        pagcontainer.appendChild(dots[0]);
      },
      { once: true }
    );
  };
