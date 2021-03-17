/** export mixins */
import carousel from "./mixins/carousel";
import noloop from "./mixins/noloop";
export { carousel, noloop };

/** export plugins */
import buttons from "./plugins/controls/buttons";
import pagination from "./plugins/controls/pagination";
import autoplay from "./plugins/addons/autoplay";
export { pagination, autoplay, buttons };

/** export the setup function */
export { setup } from "@/base";
