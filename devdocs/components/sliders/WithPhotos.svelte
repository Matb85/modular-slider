<h3 class="header-3">A slider with photo lazy-loading</h3>

<section class="MS-wrapper MS-fixed mx-auto">
  <ul id="slider-with-photos" class="MS-con blue-items">
    <li class="img-con">
      <img class="MS-lazy" src="./assets/thumbnail_bird.jpg" data-src="./assets/bird.jpg" alt="birds" />
    </li>
    <li class="img-con">
      <img class="MS-lazy" src="./assets/thumbnail_gorge.jpg" data-src="./assets/gorge.jpg" alt="gorge" />
    </li>
    <li class="img-con">
      <img class="MS-lazy" src="./assets/thumbnail_mountains.jpg" data-src="./assets/mountains.jpg" alt="mountains" />
    </li>
    <li class="img-con">
      <img class="MS-lazy" src="./assets/thumbnail_bird.jpg" data-src="./assets/bird.jpg" alt="bird" />
    </li>
    <li class="img-con">
      <img class="MS-lazy" src="./assets/thumbnail_gorge.jpg" data-src="./assets/gorge.jpg" alt="gorge" />
    </li>
  </ul>
</section>

<SliderCode>{code}</SliderCode>

<style lang="postcss">
@reference "~/tailwind.css";

.MS-wrapper.MS-fixed .MS-con .img-con {
  overflow: hidden;
}
.MS-wrapper.MS-fixed .MS-con .img-con :global(img.loaded) {
  filter: blur(0vw);
  transform: scale(1);
}
.MS-wrapper.MS-fixed div.img-con img {
  transition: 0.4s transform, 0.4s filter;
  filter: blur(2vw);
  transform: scale(1.05);
  @apply w-full h-full object-cover inline-block;
}
</style>

<script>
import SliderCode from "~/components/SliderCode.svelte";
import { onMount, onDestroy } from "svelte";
import { Carousel, lazyLoading, slideHandler } from "@/index";

let slider;
onMount(async () => {
  slider = new Carousel({
    container: "slider-with-photos",
    transitionSpeed: 400,
    initialSlide: 2,
    plugins: [slideHandler(), lazyLoading()],
  });
});
onDestroy(() => slider.destroy());

export const code = `import { Carousel, slideHandler, lazyLoading } from "modular-slider";

new Carousel({
    container: "slider-with-photos",
    transitionSpeed: 400,
    initialSlide: 2,
    plugins: [slideHandler(), lazyLoading()],
 });`;
</script>
