import { Defaults } from "@/defaults";
import { MergeCtor, MixinBase } from "@/types";

export default function controls<TBase extends MixinBase>(Base: TBase) {
  const Derived = class extends (Base as any) {
    nextBtn: HTMLElement;
    prevBtn: HTMLElement;
    constructor(setings: Defaults) {
      super(setings);
      this.nextBtn = document.querySelector(this.settings.navigation.nextBtn);
      this.prevBtn = document.querySelector(this.settings.navigation.prevBtn);
      this.nextBtn.addEventListener("click", this.btnAct.bind(this, { btn: this.nextBtn, dist: 1 }), { once: true });
      this.prevBtn.addEventListener("click", this.btnAct.bind(this, { btn: this.prevBtn, dist: -1 }), { once: true });
    }

    btnAct(params) {
      this.slideBy(params.dist);
      this.container.dispatchEvent(new PointerEvent("pointerdown", {}));
      setTimeout(() => {
        this.container.dispatchEvent(new CustomEvent("dragStop", {}));
        console.log(params.btn);
        params.btn.addEventListener("click", this.btnAct.bind(this, params), { once: true });
      }, this.settings.transitionSpeed);
    }
  };
  return Derived as MergeCtor<typeof Derived, TBase>;
}
