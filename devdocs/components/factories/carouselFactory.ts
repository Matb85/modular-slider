/** a factory of no-loop sliders @returns {Carousel Slider} */
import { setup, Carousel, SlideHandler, type SliderI } from "@/index";
const Slider = setup(Carousel, SlideHandler);
export default Slider;

export type SliderType = Carousel & SlideHandler & SliderI;
