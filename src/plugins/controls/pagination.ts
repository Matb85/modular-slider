import type { SliderI } from "@/base";

interface Options {
  container: string;
  dots: string;
  addClass: string[];
}

export default (options: Options) =>
  function pagination(this: SliderI) {
    /** get reference for the pagination container & duplicate dots */
    const pagcontainer = document.querySelector(options.container) as HTMLElement;
    const dots = [document.querySelector(options.dots) as HTMLElement];
    dots[0].dataset.id = "0";
    const dotsamount =
      typeof this.carousel !== "undefined" ? this.slides.length : this.slides.length - this.slideDisplay + 1;

    /** clone the dot */
    for (let i = 1; i < dotsamount; i++) {
      const node = dots[0].cloneNode(true) as HTMLElement;
      node.dataset.id = i.toString();
      pagcontainer.appendChild(node);
      dots.push(node);
    }
    /** a function for updating the dot that represents the current slide */
    const updatePagination = () => {
      addDotClickHandler();
      const curdot = dots[Math.abs(this.counter)];
      const curdotID = parseInt(curdot.dataset.id as string);
      dots.forEach(d => d.classList.remove(...options.addClass));
      curdot.classList.add(options.addClass[0]);
      /** if the user provided more classes, apply them to neighbouring dots */
      if (options.addClass[1])
        for (let i = 0; i < options.addClass.length; i++) {
          if (dots[curdotID + i]) dots[curdotID + i].classList.add(options.addClass[i]);
          if (dots[curdotID - i]) dots[curdotID - i].classList.add(options.addClass[i]);
        }
    };
    /** utilities for adding/removing the onclick listeners for all the dots */
    const removeDotClickHandler = () => {
      console.log("removedots");
      dots.forEach(d => {
        d.onclick = null;
      });
    };
    const addDotClickHandler = () => {
      dots.forEach(d => {
        d.onclick = async () => {
          console.log("button clicked" + d);
          this.container.dispatchEvent(new CustomEvent("pointerdragstart", {}));

          /** update the slider & the pagination */
          await this.slideTo(parseInt(d.dataset.id as string));
          updatePagination();
          this.container.dispatchEvent(new CustomEvent("transitionend", {}));
        };
      });
    };

    /** finally start the logic */
    updatePagination();
    this.container.addEventListener("pointerdragstart", removeDotClickHandler);
    this.container.addEventListener("transitionend", updatePagination);

    /** remove excessive dots when destroying */
    this.container.addEventListener(
      "destroy",
      () => {
        this.container.addEventListener("pointerdragstart", removeDotClickHandler);
        this.container.addEventListener("transitionend", updatePagination);

        pagcontainer.innerHTML = "";
        pagcontainer.appendChild(dots[0]);
      },
      { once: true }
    );
  };
