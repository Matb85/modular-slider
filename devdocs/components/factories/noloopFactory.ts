/** a factory of no-loop sliders @returns {Noloop Slider} */
import { setup, SlideHandler, NoLoop } from "@/index";
const Slider = setup(NoLoop, SlideHandler);
export default Slider;
