<h3 class="header-3">A slider with photo lazy-loading</h3>

<section class="MS-wrapper MS-fixed mx-auto">
  <ul id="slider-with-photos" class="MS-con blue-items">
    {#each photos as image}
      <li class="img-con">
        <img class="MS-lazy" src={image.src} data-src={image.dataSrc} alt={image.alt} />
      </li>
    {/each}
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

.MS-wrapper.MS-fixed .img-con img {
  transition: 0.4s transform, 0.4s filter;
  filter: blur(2vw);
  transform: scale(1.05);
  @apply w-full h-full object-cover inline-block;
}
</style>

<script>
  import SliderCode from "~/components/SliderCode.svelte";
  import { onDestroy, onMount } from "svelte";
  import { Carousel, lazyLoading, swipeHandler } from "@/index";

  const photos = [
        { src: "./assets/thumbnail_bird.jpg", dataSrc: "./assets/bird.jpg", alt: "birds" },
        { src: "./assets/thumbnail_gorge.jpg", dataSrc: "./assets/gorge.jpg", alt: "gorge" },
        { src: "./assets/thumbnail_mountains.jpg", dataSrc: "./assets/mountains.jpg", alt: "mountains" },
        { src: "./assets/thumbnail_bird.jpg", dataSrc: "./assets/bird.jpg", alt: "bird" },
        { src: "./assets/thumbnail_gorge.jpg", dataSrc: "./assets/gorge.jpg", alt: "gorge" }
      ];

let slider;
onMount(async () => {
  slider = new Carousel({
    container: "slider-with-photos",
    transitionSpeed: 400,
    initialSlide: 2,
    plugins: [swipeHandler(), lazyLoading()],
  });
});
onDestroy(() => slider.destroy());

export const code = `import { Carousel, swipeHandler, lazyLoading } from "modular-slider";

new Carousel({
    container: "slider-with-photos",
    transitionSpeed: 400,
    initialSlide: 2,
    plugins: [swipeHandler(), lazyLoading()],
 });`;
</script>
