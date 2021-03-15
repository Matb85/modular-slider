import { Slider } from "@/index";
import { Defaults } from "@/defaults";
export type MixinBase = new (settings: Defaults) => Slider;

type GetProps<TBase> = TBase extends new (settings: Defaults) => any ? Defaults : never;
type GetInstance<TBase> = TBase extends new (settings: Defaults) => infer I ? I : never;
export type MergeCtor<A, B> = new (props: GetProps<A> & GetProps<B>) => GetInstance<A> & GetInstance<B>;
