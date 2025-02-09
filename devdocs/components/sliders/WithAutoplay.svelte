<h3 class="header-3">A slider with autoplay</h3>

<section class="MS-wrapper MS-fixed mx-auto">
  <ul id="slider-with-autoplay" class="MS-con blue-items">
    {#each sliderItems as item}
      <li class="MS-item">{item}</li>
    {/each}
  </ul>
</section>

<section class="flex justify-center gap-4 mt-4">
  <button onclick={pause} disabled="{isPaused}" class="button">pause</button>
  <button onclick={resume} disabled="{!isPaused}" class="button">resume</button>
</section>

<SliderCode>{code}</SliderCode>

<script lang="ts">
import SliderCode from "~/components/SliderCode.svelte";
import { onMount, onDestroy } from "svelte";
import { autoplay, Carousel, slideHandler } from "@/index";

const sliderItems = [0, 1, 2, 3, 4, 5, 6];

let isPaused = $state(false);
let slider: Carousel;
function pause() {
  slider.plugins.autoplay.pause();
  isPaused = true;
}
function resume() {
  slider.plugins.autoplay.resume();
  isPaused = false;
}

onMount(async () => {
  slider = new Carousel({
    container: "slider-with-autoplay",
    initialSlide: 3,
    plugins: [slideHandler(), autoplay(3000)],
  });
});
onDestroy(() => slider.destroy());

export const code = `import { Carousel, slideHandler, autoplay } from "modular-slider";

new Slider({
    container: "slider",
    initialSlide: 3,
    plugins: [
        slideHandler(),
        autoplay(3000),
    ]
});`;
</script>
