<h3 class="header-3">A basic carousel</h3>

<section class="MS-wrapper MS-fixed mx-auto">
  <ul id="carousel-slider" class="MS-con blue-items">
    {#each sliderItems as item}
      <li class="MS-item">{item}</li>
    {/each}
  </ul>
</section>
<section class="button-container">
  <button on:click="{() => sl.slidePrev()}" class="button">slider.slidePrev()</button>
  <button on:click="{() => sl.slideNext()}" class="button">slider.slideNext()</button>
  <button on:click="{() => sl.slideTo(0)}" class="button">slider.slideTo(0)</button>
  <button on:click="{() => sl.goTo(1)}" class="button">slider.goTo(1)</button>
</section>

<section class="button-container">
  <input class="button w-24 bg-slate-200" type="number" bind:value max="{sliderItems.length}" min="1" />
  <button on:click="{() => sl.slideBy(-1 * value)}" class="button">slider.slideBy({-1 * value})</button>
  <button on:click="{() => sl.slideBy(value)}" class="button">slider.slideBy({value})</button>
</section>

<section class="button-container">
  <button on:click="{destroy}" disabled="{disabled}" class="button red">slider.destroy()</button>
  <button on:click="{initiate}" disabled="{!disabled}" class="button red">reinitiate</button>
</section>

<SliderCode>{code}</SliderCode>

<script lang="ts">
import SliderCode from "~/components/SliderCode.svelte";
import { onMount, onDestroy } from "svelte";
import Slider, { type SliderType } from "../factories/carouselFactory";

const sliderItems = [0, 1, 2, 3, 4, 5, 6];
let value = 2;

let sl: SliderType;
let disabled = false;

function initiate() {
  sl = new Slider({
    container: "carousel-slider",
    transitionSpeed: 400,
    initialSlide: 4,
    plugins: [],
  });
  disabled = false;
}
function destroy() {
  sl.destroy();
  disabled = true;
}

onMount(initiate);
onDestroy(destroy);

export const code = `import { setup, SlideHandler, Carousel } from "modular-slider";

const Slider = setup(Carousel, SlideHandler);
new Slider({
    container: "slider",
    initialSlide: 4,
    plugins: [],
});`;
</script>
