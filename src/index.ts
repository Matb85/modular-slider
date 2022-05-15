/** export mixins */
import Carousel from "./mixins/carousel";
import NoLoop from "./mixins/noloop";
import SlideHandler from "./mixins/slidehander";
export { Carousel, NoLoop, SlideHandler };

/** export plugins */
import buttons from "./plugins/controls/buttons";
import pagination from "./plugins/controls/pagination";
import autoplay from "./plugins/addons/autoplay";
import duplicate from "./plugins/addons/duplicate";
import lazyloading from "./plugins/addons/lazyloading";
export { pagination, autoplay, buttons, lazyloading, duplicate };

/** export the setup and getbase function */
import getBase, { setup } from "./base";
export { setup, getBase };

/** import css */
import "../style/modular-slider.css";
