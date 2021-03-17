/** export mixins */
import carousel from "./mixins/carousel";
import noloop from "./mixins/noloop";
import slidehandler from "./mixins/slidehander";
export { carousel, noloop, slidehandler };

/** export plugins */
import buttons from "./plugins/controls/buttons";
import pagination from "./plugins/controls/pagination";
import autoplay from "./plugins/addons/autoplay";
export { pagination, autoplay, buttons };

/** export the setup function */
import { setup } from "./base";
export { setup };
