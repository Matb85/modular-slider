/** export sliders */
import Carousel from "./mixins/carousel";
import NoLoop from "./mixins/noloop";
export { Carousel, NoLoop };

/** export plugins */
import buttons from "./plugins/controls/buttons";
import pagination from "./plugins/controls/pagination";
import autoplay from "./plugins/addons/autoplay";
import duplicate from "./plugins/addons/duplicate";
import lazyLoading from "./plugins/addons/lazyloading";
import slideHandler from "./plugins/slidehander";

export { pagination, autoplay, buttons, lazyLoading, duplicate, slideHandler };

/** export the setup and getBase function */
import { SliderBase } from "./base";
export { SliderBase };

/** export types */
import type { SliderI, EVENTS } from "./types";
export type { SliderI, EVENTS };
/** import css */
import "../style/modular-slider.css";
