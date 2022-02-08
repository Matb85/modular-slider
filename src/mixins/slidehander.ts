import type { SliderI } from "@/base";

interface SlideHandler extends SliderI {
  init(this: SliderI): void;
}
const SlideHandler = {
  init(this: SliderI) {
    const handler = (pEvent: PointerEvent) => pointerDown.call(this, pEvent);
    this.container.addEventListener("pointerdown", handler, { once: true });
    /** remove the pointer down event listener when destroying */
    this.container.addEventListener(
      "destroy",
      () => {
        this.container.removeEventListener("pointerdown", handler);
      },
      { once: true }
    );
  },
};
export default SlideHandler;
function pointerDown(this: SliderI, pEvent: PointerEvent) {
  this.pos.start = this.getTransX();
  this.pos.x2 = pEvent.clientX;
  switch (pEvent.pointerType) {
    case "mouse":
      document.onmousemove = mEvent => mouseMove.call(this, mEvent);
      document.onmouseup = () => dragstop.call(this);
      break;
    case "touch":
      document.ontouchmove = tEvent => touchMove.call(this, tEvent);
      document.ontouchend = () => dragstop.call(this);
      break;
  }
}

function mouseMove(this: SliderI, mEvent: MouseEvent) {
  this.pos.x1 = this.pos.x2 - mEvent.clientX;
  this.pos.x2 = mEvent.clientX;
  this.transformAbsolute(this.getTransX() - this.pos.x1);
  this.container.dispatchEvent(new CustomEvent("moving"));
}
function touchMove(this: SliderI, tEvent: TouchEvent) {
  this.pos.x1 = this.pos.x2 - tEvent.touches[0].clientX;
  this.pos.x2 = tEvent.touches[0].clientX;
  this.pos.y1 = this.pos.y2 - tEvent.touches[0].clientY;
  this.pos.y2 = tEvent.touches[0].clientY;
  /** run only if the finger is moving roughly horizontally */
  if (Math.abs(this.pos.y1) < Math.abs(this.pos.x1)) this.transformAbsolute(this.getTransX() - this.pos.x1);
  this.container.dispatchEvent(new CustomEvent("moving"));
}

async function dragstop(this: SliderI) {
  document.onmousemove = null;
  document.ontouchmove = null;
  document.ontouchend = null;
  document.onmouseup = null;
  this.container.dispatchEvent(new CustomEvent("dragstop", {}));
  this.container.onpointerdown = null;
  if (this.pos.start != this.getTransX()) {
    if (this.pos.start > this.getTransX()) await this.slideNext();
    else await this.slidePrev();
  }
  this.container.onpointerdown = pEvent => pointerDown.call(this, pEvent);
  this.container.dispatchEvent(new CustomEvent("transitionend", {}));
}
