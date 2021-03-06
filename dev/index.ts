import { setup, Slidehandler, Carousel, buttons, pagination, lazyloading } from "../src/index.js";
import "./main.css";

const Slider = setup(Carousel, Slidehandler);
console.dir(Slider);

let slider = new Slider({
  container: "first-slider",
  transitionSpeed: 400,
  plugins: [
    // autoplay(),
    buttons({ nextBtn: "#next", prevBtn: "#prev" }),
    pagination({
      container: ".slider-pagination",
      dots: ".dot",
      addClass: ["current", "adjacent"],
    }),
  ],
});

const DESTROY = false;
if (DESTROY)
  setTimeout(() => {
    slider.destroy();
    slider = new Slider({
      container: "first-slider",
      transitionSpeed: 400,
      plugins: [
        // autoplay(),
        buttons({ nextBtn: "#next", prevBtn: "#prev" }),
        pagination({
          container: ".slider-pagination",
          dots: ".dot",
          addClass: ["current", "adjacent"],
        }),
      ],
    });
  }, 500);

new Slider({
  container: "image-slider",
  transitionSpeed: 400,
  plugins: [lazyloading()],
});
