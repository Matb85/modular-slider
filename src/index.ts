/** export mixins */
import carousel from "./mixins/carousel";
import noloop from "./mixins/noloop";
import slidehandler from "./mixins/slidehander";
export { carousel, noloop, slidehandler };

/** export plugins */
import buttons from "./plugins/controls/buttons";
import pagination from "./plugins/controls/pagination";
import autoplay from "./plugins/addons/autoplay";
import lazyloading from "./plugins/addons/lazyloading";
export { pagination, autoplay, buttons, lazyloading };

/** export the setup function */
import Base, { setup } from "./base";
export { setup, Base };
