import type { Slider } from "@/base";

interface Params {
  dist: number;
  btn: HTMLElement;
}
interface Options {
  nextBtn: string;
  prevBtn: string;
}
export default (options: Options) =>
  function buttons(this: Slider) {
    const nextBtn = document.querySelector(options.nextBtn) as HTMLElement;
    const prevBtn = document.querySelector(options.prevBtn) as HTMLElement;
    nextBtn.addEventListener("click", btnAct.bind(this, { btn: nextBtn, dist: 1 }), { once: true });
    prevBtn.addEventListener("click", btnAct.bind(this, { btn: prevBtn, dist: -1 }), { once: true });

    async function btnAct(this: Slider, params: Params): Promise<void> {
      this.container.dispatchEvent(new PointerEvent("pointerdown", {pointerType: "mouse"}));
      await this.slideBy(params.dist);
      document.dispatchEvent(new TouchEvent ("touchend", {}));
      document.dispatchEvent(new MouseEvent ("mouseup", {}));
      this.container.dispatchEvent(new CustomEvent("dragstop", {}));
      params.btn.addEventListener("click", btnAct.bind(this, params), { once: true });
    }
    return { prevBtn, nextBtn };
  };
