import { EVENTS, type SliderI } from "@/types";

interface Options {
    container: string;
    dots: string;
    addClass: string[];
}

export default (options: Options) =>
    function pagination(this: SliderI) {
        /** get reference for the pagination container & duplicate dots */
        const pagcontainer = document.querySelector(options.container) as HTMLElement;
        const dots = [document.querySelector(options.container + " " + options.dots) as HTMLElement];
        dots[0].dataset.id = "0";
        const dotsamount = "updateDOM" in this ? this.slides.length : this.slides.length - this.slideDisplay + 1;

        /** clone the dot */
        for (let i = 1; i < dotsamount; i++) {
            const node = dots[0].cloneNode(true) as HTMLElement;
            node.dataset.id = i.toString();
            pagcontainer.appendChild(node);
            dots.push(node);
        }
        /** a function for updating the dot that represents the current slide */
        const updatePagination = () => {
            const curdot = dots[this.getCurrentSlide()];
            const curdotID = parseInt(curdot.dataset.id as string);
            dots.forEach(d => d.classList.remove(...options.addClass));
            curdot.classList.add(options.addClass[0]);
            /** if the user provided more classes, apply them to neighboring dots */
            if (options.addClass[1])
                for (let i = 0; i < options.addClass.length; i++) {
                    if (dots[curdotID + i]) dots[curdotID + i].classList.add(options.addClass[i]);
                    if (dots[curdotID - i]) dots[curdotID - i].classList.add(options.addClass[i]);
                }
        };
        dots.forEach(d => {
            d.onclick = async () => {
                /** update the slider & the pagination */
                await this.slideTo(parseInt(d.dataset.id as string));
                updatePagination();
            };
        });

        /** finally start the logic */
        updatePagination();
        this.addConListener(EVENTS.TR_END, updatePagination);

        /** remove excessive dots when destroying */
        this.onDestroy(() => {
            pagcontainer.innerHTML = "";
            pagcontainer.appendChild(dots[0]);
        });
    };
