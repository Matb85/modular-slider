<h3 class="header-3">A basic carousel</h3>
<section class="ms-outer-con mx-auto">
  <div id="carousel-slider" class="ms-inner-con blue-items">
    {#each sliderItems as item}
      <div class="ms-item">{item}</div>
    {/each}
  </div>
</section>
<section class="flex justify-center gap-4 mt-4">
  <button id="prev" on:click="{() => sl.slidePrev()}" class="button">slider.slidePrev()</button>
  <button id="next" on:click="{() => sl.slideNext()}" class="button">slider.slideNext()</button>
  <button id="next" on:click="{() => sl.slideTo(1)}" class="button">slider.slideTo(1)</button>
  <button id="next" on:click="{() => sl.slideBy(2)}" class="button">slider.slideBy(2)</button>
  <button id="next" on:click="{() => sl.slideBy(-2)}" class="button">slider.slideBy(-2)</button>
</section>
<SliderCode>{code}</SliderCode>

<script>
import SliderCode from "~/components/SliderCode.svelte";
import { onMount } from "svelte";
import Slider from "../factories/carouselFactory";

const sliderItems = [0, 1, 2, 3, 4, 5, 6];

let sl;
onMount(async () => {
  sl = new Slider({
    container: "carousel-slider",
    transitionSpeed: 400,
  });
});

export const code = `import { setup, Slidehandler, Carousel } from "modular-slider";

const Slider = setup(Carousel, Slidehandler);
new Slider({
    container: "slider",
});`;
</script>
