/** export sliders */
import { SliderBase } from "./classes/SliderBase";
import { Carousel } from "./classes/Carousel";
import { NoLoop } from "./classes/NoLoop";
export { SliderBase, Carousel, NoLoop };

/** export plugins */
import buttons from "./plugins/controls/buttons";
import pagination from "./plugins/controls/pagination";
import autoplay from "./plugins/addons/autoplay";
import duplicate from "./plugins/addons/duplicate";
import lazyLoading from "./plugins/addons/lazyloading";
import swipeHandler from "./plugins/swipeHandler";

export { pagination, autoplay, buttons, lazyLoading, duplicate, swipeHandler };

/** export types */
import type { SliderI, EVENTS } from "./types";
export type { SliderI, EVENTS };

/** import css */
import "../style/modular-slider.css";
