<h3 class="header-3">A slider with buttons</h3>
<section class="MS-wrapper MS-fixed mx-auto">
  <ul id="slider-with-btns" class="MS-con blue-items">
    {#each sliderItems as item}
      <li class="MS-item">{item}</li>
    {/each}
  </ul>
</section>
<section class="button-container">
  <button id="prev" class="button">prev</button>
  <button id="next" class="button">next</button>
</section>
<SliderCode>{code}</SliderCode>

<script>
import SliderCode from "~/components/SliderCode.svelte";
import { onMount, onDestroy } from "svelte";
import Slider from "../factories/carouselFactory";
import { buttons } from "@/index";

const sliderItems = [0, 1, 2, 3, 4, 5, 6];

let slider;
onMount(async () => {
  slider = new Slider({
    container: "slider-with-btns",
    initialSlide: 0,
    plugins: [buttons({ nextBtn: "#next", prevBtn: "#prev" })],
  });
});
onDestroy(() => slider.destroy());

export const code = `import { setup, SlideHandler, Carousel, buttons } from "modular-slider";

const Slider = setup(Carousel, SlideHandler);
new Slider({
    container: "slider",
    initialSlide: 0,
    plugins: [
        buttons({ nextBtn: "#next", prevBtn: "#prev" }),
    ]
});`;
</script>
