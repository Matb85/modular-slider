/** export mixins */
import Carousel from "./mixins/Carousel";
import Noloop from "./mixins/Noloop";
import Slidehandler from "./mixins/Slidehander";
export { Carousel, Noloop, Slidehandler };

/** export plugins */
import buttons from "./plugins/controls/buttons";
import pagination from "./plugins/controls/pagination";
import autoplay from "./plugins/addons/autoplay";
import lazyloading from "./plugins/addons/lazyloading";
export { pagination, autoplay, buttons, lazyloading };

/** export the setup and getbase function */
import getBase, { setup } from "./base";
export { setup, getBase };
