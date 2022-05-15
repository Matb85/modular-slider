<h3 class="header-3">A basic carousel</h3>

<section class="ms-outer-con mx-auto">
  <ul id="carousel-slider" class="ms-inner-con blue-items">
    {#each sliderItems as item}
      <li class="ms-item">{item}</li>
      >
    {/each}
  </ul>
</section>
<section class="button-container">
  <button on:click="{() => sl.slidePrev()}" class="button">slider.slidePrev()</button>
  <button on:click="{() => sl.slideNext()}" class="button">slider.slideNext()</button>
  <button on:click="{() => sl.slideTo(0)}" class="button">slider.slideTo(0)</button>
</section>

<section class="button-container">
  <input class="button w-24 bg-slate-200" type="number" bind:value max="{sliderItems.length}" min="1" />
  <button on:click="{() => sl.slideBy(-1 * value)}" class="button">slider.slideBy({-1 * value})</button>
  <button on:click="{() => sl.slideBy(value)}" class="button">slider.slideBy({value})</button>
</section>

<SliderCode>{code}</SliderCode>

<script>
import SliderCode from "~/components/SliderCode.svelte";
import { onMount, onDestroy } from "svelte";
import Slider from "../factories/carouselFactory";

const sliderItems = [0, 1, 2, 3, 4, 5, 6];
let value = 2;
let sl;
onMount(async () => {
  sl = new Slider({
    container: "carousel-slider",
    transitionSpeed: 400,
    initialSlide: 4,
  });
});
onDestroy(() => sl.destroy());

export const code = `import { setup, Slidehandler, Carousel } from "modular-slider";

const Slider = setup(Carousel, Slidehandler);
new Slider({
    container: "slider",
    initialSlide: 4,
});`;
</script>
