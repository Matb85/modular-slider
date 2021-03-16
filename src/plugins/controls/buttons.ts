import { Slider } from "@/base";

interface Params {
  dist: number;
  btn: HTMLElement;
}
interface Options {
  nextBtn: string;
  prevBtn: string;
}
export default (options: Options) =>
  function pagination(this: Slider) {
    const nextBtn = document.querySelector(options.nextBtn) as HTMLElement;
    const prevBtn = document.querySelector(options.prevBtn) as HTMLElement;
    nextBtn.addEventListener("click", btnAct.bind(this, { btn: nextBtn, dist: 1 }), { once: true });
    prevBtn.addEventListener("click", btnAct.bind(this, { btn: prevBtn, dist: -1 }), { once: true });

    async function btnAct(this: Slider, params: Params): Promise<void> {
      await this.slideBy(params.dist);
      // this.container.dispatchEvent(new PointerEvent("pointerdown", {}));
      this.container.dispatchEvent(new CustomEvent("dragStop", {}));
      params.btn.addEventListener("click", btnAct.bind(this, params), { once: true });
    }
  };
