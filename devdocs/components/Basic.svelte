<section class="ms-outer-con">
    <div id="first-slider" class="ms-inner-con">
        {#each sliderItems as item}
        <div class="ms-item">{item}</div>
        {/each}
    </div>
</section>

<script>
import { onMount } from "svelte";
import { setup, slidehandler, carousel } from "@src/index.js";

const sliderItems = [0,1,2,3,4,5,6]


onMount(async () => {
    const Slider = setup(carousel, slidehandler);
    console.dir(Slider);
    const slider = new Slider({
        container: "#first-slider",
        transitionSpeed: 400,
        slidesPerView: 2,
        plugins: [
            // buttons({ nextBtn: "#next", prevBtn: "#prev" }),
        ],
    });
})
</script>

<style lang="scss">
.ms-outer-con {
    margin: 0 auto;
    border: 1px solid red;
    .ms-inner-con .ms-item {
        height: 10rem;
        background-color: blue;
        color: white;
        text-align: center;
    }
}
</style>