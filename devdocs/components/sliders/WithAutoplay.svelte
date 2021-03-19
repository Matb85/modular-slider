<h3 class="header-3">A slider with autoplay</h3>
<section class="ms-outer-con mx-auto">
  <div id="slider-with-autoplay" class="ms-inner-con blue-items">
    {#each sliderItems as item}
      <div class="ms-item">{item}</div>
    {/each}
  </div>
</section>
<section class="flex justify-center gap-4 mt-4">
  <button on:click="{pause}" disabled="{ispaused}" class="button">pause</button>
  <button on:click="{resume}" disabled="{!ispaused}" class="button"
    >resume</button>
</section>
<SliderCode>{code}</SliderCode>

<script lang="ts">
import SliderCode from "~/components/SliderCode.svelte";
import { onMount } from "svelte";
import Slider from "../factories/carouselFactory";
import { autoplay } from "@/index";

export const sliderItems = [0, 1, 2, 3, 4, 5, 6];

export let ispaused = false;
let slider: any;
export function pause() {
  slider.plugins.autoplay.pause();
  ispaused = true;
}
export function resume() {
  slider.plugins.autoplay.resume();
  ispaused = false;
}

onMount(async () => {
  slider = new Slider({
    container: "#slider-with-autoplay",
    slidesPerView: 2,
    plugins: [autoplay(1000)],
  });
});

export const code = `import { setup, Slidehandler, Carousel, autoplay } from "modular-slider";

const Slider = setup(Carousel, Slidehandler);
new Slider({
    container: "#slider",
    slidesPerView: 2,
    plugins: [
        autoplay(3000),
    ]
});`;
</script>
