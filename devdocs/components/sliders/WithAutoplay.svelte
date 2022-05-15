<h3 class="header-3">A slider with autoplay</h3>
<section class="ms-outer-con mx-auto">
  <ul id="slider-with-autoplay" class="ms-inner-con blue-items">
    {#each sliderItems as item}
      <li class="ms-item">{item}</li>
      >
    {/each}
  </ul>
</section>
<section class="flex justify-center gap-4 mt-4">
  <button on:click="{pause}" disabled="{ispaused}" class="button">pause</button>
  <button on:click="{resume}" disabled="{!ispaused}" class="button">resume</button>
</section>
<SliderCode>{code}</SliderCode>

<script>
import SliderCode from "~/components/SliderCode.svelte";
import { onMount, onDestroy } from "svelte";
import Slider from "../factories/carouselFactory";
import { autoplay } from "@/index";

const sliderItems = [0, 1, 2, 3, 4, 5, 6];

let ispaused = false;
let slider;
function pause() {
  slider.plugins.autoplay.pause();
  ispaused = true;
}
function resume() {
  slider.plugins.autoplay.resume();
  ispaused = false;
}

onMount(async () => {
  slider = new Slider({
    container: "slider-with-autoplay",
    initialSlide: 3,
    plugins: [autoplay(3000)],
  });
});
onDestroy(() => slider.destroy());

export const code = `import { setup, SlideHandler, Carousel, autoplay } from "modular-slider";

const Slider = setup(Carousel, SlideHandler);
new Slider({
    container: "slider",
    initialSlide: 3,
    plugins: [
        autoplay(3000),
    ]
});`;
</script>
