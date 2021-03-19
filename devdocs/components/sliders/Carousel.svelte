<h3 class="header-3">A basic carousel</h3>
<section class="ms-outer-con mx-auto">
  <div id="carousel-slider" class="ms-inner-con blue-items">
    {#each sliderItems as item}
      <div class="ms-item">{item}</div>
    {/each}
  </div>
</section>
<SliderCode>{code}</SliderCode>

<script>
import SliderCode from "@/components/SliderCode.svelte";
import { onMount } from "svelte";
import { setup, Slidehandler, Carousel } from "@src/index.js";

export const sliderItems = [0, 1, 2, 3, 4, 5, 6];

onMount(async () => {
  const Slider = setup(Carousel, Slidehandler);
  new Slider({
    container: "#carousel-slider",
    transitionSpeed: 400,
    slidesPerView: 2,
  });
});

export const code = `import { setup, Slidehandler, Carousel } from "modular-slider";

const Slider = setup(Carousel, Slidehandler);
new Slider({
    container: "#slider",
    slidesPerView: 2,
});`;
</script>
