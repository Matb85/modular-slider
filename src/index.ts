/**import mixins */
import carousel from "./init/carousel";
import noloop from "./init/noloop";
export { carousel, noloop };

/** import plugins */
import buttons from "./controls/buttons";
import pagination from "./controls/pagination";
import autoplay from "./addons/autoplay";
export { pagination, autoplay, buttons };

/** import base & setup function */
export { setup } from "@/base";
