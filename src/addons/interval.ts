import { Defaults } from "@/defaults";
import { MergeCtor, MixinBase } from "@/types";

export default function pagination<TBase extends MixinBase>(Base: TBase) {
  const Derived = class extends (Base as any) {
    constructor(props: Defaults) {
      super(props);
      let autoplay = setInterval(() => {
        this.slideNext();
      }, this.settings.interval);
      this.container.addEventListener("pointerdown", () => {
        clearInterval(autoplay);
      });
      this.container.addEventListener("dragStop", () => {
        autoplay = setInterval(() => {
          this.slideNext();
        }, this.settings.interval);
      });
    }
  };
  return Derived as MergeCtor<typeof Derived, TBase>;
}
