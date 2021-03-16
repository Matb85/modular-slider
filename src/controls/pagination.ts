import { Slider } from "@/index";

interface Options {
  container: string;
  dots: string;
  addClass: string[];
}

export default (options: Options) =>
  function pagination(this: Slider) {
    const pagcontainer = document.querySelector(options.container) as HTMLElement;
    const dots = [document.querySelector(options.dots) as HTMLElement];
    dots[0].dataset.id = "0";
    const dotsamount = this.carousel ? this.slides.length : this.slides.length - this.slideDisplay + 1;
    console.log(dotsamount, this.carousel);
    for (let i = 1; i < dotsamount; i++) {
      const node = dots[0].cloneNode(true) as HTMLElement;
      node.dataset.id = i.toString();
      pagcontainer.appendChild(node);
      dots.push(node);
    }
    addDotClickHandler.call(this);
    updatePagination.call(this);
    this.container.addEventListener("dragStop", () => {
      updatePagination.call(this);
    });

    function updatePagination(this: Slider) {
      console.log(this.counter);
      const curdot = dots[Math.abs(this.counter)];
      const curdotID = parseInt(curdot.dataset.id as string);
      dots.forEach(d => {
        d.classList.remove(...options.addClass);
      });
      curdot.classList.add(options.addClass[0]);
      /** if the user provided more class, apply them to the neighboring dots */
      if (options.addClass[1])
        for (let i = 0; i < options.addClass.length; i++) {
          if (dots[curdotID + i]) dots[curdotID + i].classList.add(options.addClass[i]);
          if (dots[curdotID - i]) dots[curdotID - i].classList.add(options.addClass[i]);
        }
    }
    function addDotClickHandler(this: Slider) {
      dots.forEach(d => {
        d.onclick = async () => {
          this.slideTo(parseInt(d.dataset.id as string)).then(() => addDotClickHandler.call(this));
          updatePagination.call(this);
        };
      });
    }
  };
