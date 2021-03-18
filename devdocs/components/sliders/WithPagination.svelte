<h3 class="header-3">A slider with pagination</h3>
<section class="ms-outer-con mx-auto">
    <div id="slider-with-pagination" class="ms-inner-con blue-items">
        {#each sliderItems as item}
        <div class="ms-item">{item}</div>
        {/each}
    </div>
</section>
<section id="slider-pagination" class="mt-4 flex justify-center gap-2">
  <button class="dot"></button>
</section>
<SliderCode>{code}</SliderCode>


<script>
import SliderCode from "@/components/SliderCode.svelte"
import { onMount } from "svelte";
import { setup, Slidehandler, Carousel, pagination } from "@src/index.js";

export const sliderItems = [0,1,2,3,4,5,6]


onMount(async () => {
    const Slider = setup(Carousel, Slidehandler);
    new Slider({
        container: "#slider-with-pagination",
        slidesPerView: 2,
        plugins: [
            pagination({
                container: "#slider-pagination",
                dots: ".dot",
                addClass: ["current"]
            }),
        ]
    });
})

export const code = 
`import { setup, Slidehandler, Carousel, buttons } from "modular-slider";

const Slider = setup(Carousel, Slidehandler);
new Slider({
    container: "#slider",
    slidesPerView: 2,
    plugins: [
        buttons({ nextBtn: "#next", prevBtn: "#prev" }),
    ]
});`
</script>

