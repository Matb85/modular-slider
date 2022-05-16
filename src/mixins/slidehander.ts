import { type SliderI, ONCE } from "@/base";

export default {
  init(this: SliderI) {
    this.addConListener("pointerdown", pEvent => pointerDown.call(this, pEvent as PointerEvent), ONCE);
  },
};

function pointerDown(this: SliderI, pEvent: PointerEvent) {
  this.pos.start = this.getTransX();
  this.pos.x2 = pEvent.clientX;
  this.ismoving = true;
  switch (pEvent.pointerType) {
    case "mouse":
      this.container.dispatchEvent(new CustomEvent("ms-pointerdragstart", {}));
      document.onmousemove = mouseMove.bind(this);
      document.onmouseup = dragstop.bind(this);
      break;
    case "touch":
      this.container.dispatchEvent(new CustomEvent("ms-pointerdragstart", {}));
      document.ontouchmove = touchMove.bind(this);
      document.ontouchend = dragstop.bind(this);
      break;
  }
}

function mouseMove(this: SliderI, mEvent: MouseEvent) {
  this.pos.x1 = this.pos.x2 - mEvent.clientX;
  this.pos.x2 = mEvent.clientX;
  this.transformAbsolute(this.getTransX() - this.pos.x1);
  this.container.dispatchEvent(new CustomEvent("ms-moving"));
}
function touchMove(this: SliderI, tEvent: TouchEvent) {
  this.pos.x1 = this.pos.x2 - tEvent.touches[0].clientX;
  this.pos.x2 = tEvent.touches[0].clientX;
  this.pos.y1 = this.pos.y2 - tEvent.touches[0].clientY;
  this.pos.y2 = tEvent.touches[0].clientY;
  /** run only if the finger is moving roughly horizontally */
  if (Math.abs(this.pos.y1) < Math.abs(this.pos.x1)) this.transformAbsolute(this.getTransX() - this.pos.x1);
  this.container.dispatchEvent(new CustomEvent("ms-moving"));
}

async function dragstop(this: SliderI) {
  document.onmousemove = null;
  document.ontouchmove = null;
  document.ontouchend = null;
  document.onmouseup = null;
  this.ismoving = false;
  this.container.dispatchEvent(new CustomEvent("ms-pointerdragend", {}));
  this.container.onpointerdown = null;
  if (this.pos.start != this.getTransX()) {
    if (this.pos.start > this.getTransX()) await this.slideNext();
    else await this.slidePrev();
  }

  this.addConListener("pointerdown", pEvent => pointerDown.call(this, pEvent as PointerEvent), ONCE);
}
