import { EVENTS, namedPlugin, type SliderI } from "@/types";

/** how far the pointer has to travel horizontally (in px) before a press becomes a drag */
const DRAG_THRESHOLD = 5;
const NO_POINTER = -1;

export const swipeHandler = () =>
    namedPlugin("swipeHandler", function (this: SliderI) {
        let pointerId = NO_POINTER;
        let startX = 0;
        let startY = 0;
        let isDragging = false;
        /** true after a drag, so that the click that ends it does not reach the content of the slide */
        let suppressClick = false;

        const pointerDown = (pEvent: PointerEvent) => {
            if (pointerId !== NO_POINTER || this.isMoving || !pEvent.isPrimary) return;
            if (pEvent.pointerType === "mouse" && pEvent.button !== 0) return;

            pointerId = pEvent.pointerId;
            startX = pEvent.clientX;
            startY = pEvent.clientY;
            isDragging = false;
            suppressClick = false;
            this.pos.start = this.getTransX();
            this.pos.x2 = pEvent.clientX;
            this.isMoving = true;
            this.dispatchEvent(EVENTS.DRAG_START);

            document.addEventListener("pointermove", pointerMove);
            document.addEventListener("pointerup", pointerEnd);
            document.addEventListener("pointercancel", pointerEnd);
        };

        const pointerMove = (pEvent: PointerEvent) => {
            if (pEvent.pointerId !== pointerId) return;

            if (!isDragging) {
                const distX = Math.abs(pEvent.clientX - startX);
                if (distX < DRAG_THRESHOLD) return;
                /** a finger has to be moving roughly horizontally, otherwise it is scrolling the page */
                if (pEvent.pointerType !== "mouse" && distX <= Math.abs(pEvent.clientY - startY)) return;

                isDragging = true;
                /** start from here, so the slider does not jump by the threshold */
                this.pos.x2 = pEvent.clientX;
                /** keep receiving the events when the pointer leaves the slider
                 * it is not done on pointerdown, because a captured pointer sends its click to the container */
                try {
                    this.container.setPointerCapture(pointerId);
                } catch {
                    /** the pointer is no longer active */
                }
            }

            this.pos.x1 = this.pos.x2 - pEvent.clientX;
            this.pos.x2 = pEvent.clientX;
            this.transformAbsolute(this.getTransX() - this.pos.x1);
            this.dispatchEvent(EVENTS.MV);
        };

        const pointerEnd = async (pEvent: PointerEvent) => {
            if (pEvent.pointerId !== pointerId) return;
            removeDocListeners();
            pointerId = NO_POINTER;
            const wasDragging = isDragging;
            isDragging = false;
            suppressClick = wasDragging;
            /** check the direction now - the listeners of the event below may realign the slider */
            const dist = this.pos.start - this.getTransX();
            this.isMoving = false;
            this.dispatchEvent(EVENTS.DRAG_END);

            if (!wasDragging) return;
            if (dist > 0) await this.slideNext();
            else if (dist < 0) await this.slidePrev();
        };

        const click = (event: MouseEvent) => {
            if (!suppressClick) return;
            suppressClick = false;
            /** a click with no detail comes from the keyboard or a script, not from the drag */
            if (event.detail === 0) return;
            event.preventDefault();
            event.stopPropagation();
        };

        const removeDocListeners = () => {
            document.removeEventListener("pointermove", pointerMove);
            document.removeEventListener("pointerup", pointerEnd);
            document.removeEventListener("pointercancel", pointerEnd);
        };

        this.addConListener("pointerdown", pointerDown as EventListener);
        /** prevent links and images from being dragged out of the slider */
        this.addConListener("dragstart", event => event.preventDefault());
        this.container.addEventListener("click", click, true);

        /** leave vertical scrolling and zooming to the browser, horizontal swipes belong to the slider */
        const touchAction = this.container.style.touchAction;
        this.container.style.touchAction = "pan-y pinch-zoom";

        this.onDestroy(() => {
            removeDocListeners();
            this.container.removeEventListener("click", click, true);
            this.container.style.touchAction = touchAction;
        });
    });
