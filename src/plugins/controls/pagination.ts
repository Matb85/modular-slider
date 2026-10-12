import { EVENTS, namedPlugin, type SliderI } from "@/types";

interface Options {
    container: string;
    dots: string;
    addClass: string[];
}

export const pagination = (options: Options) =>
    namedPlugin("pagination", function (this: SliderI) {
        /** get reference for the pagination container & duplicate dots */
        const pagContainer = document.querySelector(options.container) as HTMLElement;
        const dots = [document.querySelector(options.container + " " + options.dots) as HTMLElement];
        dots[0].dataset.id = "0";

        /** a function for updating the dot that represents the current slide */
        const updatePagination = () => {
            const curDot = dots[this.getCurrentSlide()];
            if (!curDot) return;
            const curDotID = parseInt(curDot.dataset.id as string);
            dots.forEach(d => d.classList.remove(...options.addClass));
            curDot.classList.add(options.addClass[0]);
            /** if the user provided more classes, apply them to neighboring dots */
            if (options.addClass[1])
                for (let i = 0; i < options.addClass.length; i++) {
                    if (dots[curDotID + i]) dots[curDotID + i].classList.add(options.addClass[i]);
                    if (dots[curDotID - i]) dots[curDotID - i].classList.add(options.addClass[i]);
                }
        };
        const updateDots = () => {
            /** a carousel can stop at any slide, the other sliders stop once the last slide is in view */
            const dotsAmount = this.carousel
                ? this.slides.length
                : Math.max(1, this.slides.length - this.slidesPerView + 1);

            while (dots.length > dotsAmount) (dots.pop() as HTMLElement).remove();
            for (let i = dots.length; i < dotsAmount; i++) {
                const node = dots[0].cloneNode(true) as HTMLElement;
                node.dataset.id = i.toString();
                pagContainer.appendChild(node);
                dots.push(node);
            }
            dots.forEach(d => {
                d.onclick = async () => {
                    await this.slideTo(parseInt(d.dataset.id as string));
                    updatePagination();
                };
            });
            updatePagination();
        };

        /** finally start the logic */
        updateDots();
        this.addConListener(EVENTS.TR_END, updatePagination);
        /** the number of slides per view may have changed */
        this.addConListener(EVENTS.RESIZE, updateDots);

        /** remove excessive dots when destroying */
        this.onDestroy(() => {
            pagContainer.innerHTML = "";
            pagContainer.appendChild(dots[0]);
            dots[0].onclick = null;
        });
    });
