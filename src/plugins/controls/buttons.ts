import type { SliderI } from "@/base";

interface Params {
  dist: number;
  btn: HTMLElement;
}
interface Options {
  nextBtn: string;
  prevBtn: string;
}
export default (options: Options) =>
  function buttons(this: SliderI) {
    const nextBtn = document.querySelector(options.nextBtn) as HTMLElement;
    const prevBtn = document.querySelector(options.prevBtn) as HTMLElement;
    nextBtn.onclick = btnAct.bind(this, { btn: nextBtn, dist: 1 });
    prevBtn.onclick = btnAct.bind(this, { btn: prevBtn, dist: -1 });
    this.container.addEventListener("pointerdragstart", () => {
      nextBtn.onclick = null;
      prevBtn.onclick = null;
    });
    this.container.addEventListener("transitionend", () => {
      nextBtn.onclick = btnAct.bind(this, { btn: nextBtn, dist: 1 });
      prevBtn.onclick = btnAct.bind(this, { btn: prevBtn, dist: -1 });
    });
    /** clear event listeners when destroying */
    this.container.addEventListener(
      "destroy",
      () => {
        nextBtn.onclick = null;
        prevBtn.onclick = null;
      },
      { once: true }
    );

    return { prevBtn, nextBtn };
  };

async function btnAct(this: SliderI, params: Params): Promise<void> {
  this.container.dispatchEvent(new CustomEvent("pointerdragstart", {}));
  await this.slideBy(params.dist);
  this.container.dispatchEvent(new CustomEvent("transitionend", {}));
}
