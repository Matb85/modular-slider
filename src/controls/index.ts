import { Defaults } from "@/defaults";
import { MergeCtor, MixinBase } from "@/types";

export default function carousel<TBase extends MixinBase>(Base: TBase) {
  const Derived = class Carousel extends (Base as any) {
    constructor(setings) {
      super(setings);
      // buttons.call(this);
    }
  };
}
