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

    /** clear event listeners when destroying */
    this.onDestroy(() => {
      nextBtn.onclick = null;
      prevBtn.onclick = null;
    });

    return { prevBtn, nextBtn };
  };

async function btnAct(this: SliderI, params: Params): Promise<void> {
  await this.slideBy(params.dist);
}
