<h3 class="header-3">A slider with autoplay</h3>
<section class="ms-outer-con mx-auto">
  <div id="slider-with-autoplay" class="ms-inner-con blue-items">
    {#each sliderItems as item}
      <div class="ms-item">{item}</div>
    {/each}
  </div>
</section>
<SliderCode>{code}</SliderCode>

<script lang="ts">
import SliderCode from "~/components/SliderCode.svelte";
import { onMount } from "svelte";
import { setup, Slidehandler, Carousel, autoplay } from "@/index";

export const sliderItems = [0, 1, 2, 3, 4, 5, 6];

onMount(async () => {
  const Slider = setup(Carousel, Slidehandler);
  new Slider({
    container: "#slider-with-autoplay",
    slidesPerView: 2,
    plugins: [autoplay(2500)],
  });
});

export const code = `import { setup, Slidehandler, Carousel, autoplay } from "modular-slider";

const Slider = setup(Carousel, Slidehandler);
new Slider({
    container: "#slider",
    slidesPerView: 2,
    plugins: [
        autoplay(2500),
    ]
});`;
</script>
