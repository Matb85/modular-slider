import type { SliderI } from "@/types";

interface Options {
    nextBtn: string;
    prevBtn: string;
}

export default (options: Options) =>
    function buttons(this: SliderI) {
        const nextBtn = document.querySelector(options.nextBtn) as HTMLElement;
        const prevBtn = document.querySelector(options.prevBtn) as HTMLElement;
        nextBtn.onclick = btnAct.bind(this, 1);
        prevBtn.onclick = btnAct.bind(this, -1);

        /** clear event listeners when destroying */
        this.onDestroy(() => {
            nextBtn.onclick = null;
            prevBtn.onclick = null;
        });

        return { prevBtn, nextBtn };
    };

async function btnAct(this: SliderI, dist: number): Promise<void> {
    await this.slideBy(dist);
}
