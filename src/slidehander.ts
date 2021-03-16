import { Slider } from "./base";

export default function pointerDown(this: Slider, pEvent: PointerEvent) {
  this.pos.start = this.getTransX();
  this.pos.x2 = pEvent.clientX;
  switch (pEvent.pointerType) {
    case "mouse":
      document.onmousemove = mEvent => mouseMove.call(this, mEvent);
      document.onmouseup = () => dragStop.call(this);
      break;
    case "touch":
      document.ontouchmove = tEvent => touchMove.call(this, tEvent);
      document.ontouchend = () => dragStop.call(this);
      break;
  }
}

function mouseMove(this: Slider, mEvent: MouseEvent) {
  this.pos.x1 = this.pos.x2 - mEvent.clientX;
  this.pos.x2 = mEvent.clientX;
  this.container.style.transform = "translateX(" + (this.getTransX() - this.pos.x1) + "px)";
  this.container.dispatchEvent(new CustomEvent("moving"));
}
function touchMove(this: Slider, tEvent: TouchEvent) {
  this.pos.x1 = this.pos.x2 - tEvent.touches[0].clientX;
  this.pos.x2 = tEvent.touches[0].clientX;
  this.pos.y1 = this.pos.y2 - tEvent.touches[0].clientY;
  this.pos.y2 = tEvent.touches[0].clientY;
  if (Math.abs(this.pos.y1) < Math.abs(this.pos.x1))
    this.container.style.transform = "translateX(" + (this.getTransX() - this.pos.x1) + "px)";
  this.container.dispatchEvent(new CustomEvent("moving"));
}

async function dragStop(this: Slider) {
  document.onmousemove = null;
  document.ontouchmove = null;
  document.ontouchend = null;
  document.onmouseup = null;
  this.container.onpointerdown = null;
  if (this.pos.start != this.getTransX()) {
    if (this.pos.start > this.getTransX()) await this.slideNext();
    else await this.slidePrev();
  }
  this.container.dispatchEvent(new CustomEvent("dragStop", {}));
  this.container.onpointerdown = pEvent => pointerDown.call(this, pEvent);
  this.container.dispatchEvent(new CustomEvent("transitioned", {}));
}
