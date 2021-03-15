console.time("loop");
import { extend, Defaults } from "./defaults";
import carousel from "./init/carousel";
import noloop from "./init/noloop";
import buttons from "./controls/buttons";
import pagination from "./controls/pagination";
import interval from "./other/interval";
export { carousel, noloop, buttons, pagination, interval };

export function Pipe(decorators: Array<any>, n: number = decorators.length): typeof Slider {
  if (n == 0) return Slider;
  return decorators[n - 1](Pipe(decorators, n - 1));
}

//object
export class Slider {
  settings: Required<Defaults>;
  container: HTMLElement;
  slides: HTMLCollectionOf<HTMLElement>;
  pos = { start: 0, x1: 0, x2: 0, y1: 0, y2: 0 };
  slideWidth: number;
  slideDisplay: number;
  counter = 1;
  slideNext: () => void;
  slidePrev: () => void;

  constructor(settings: Defaults) {
    this.settings = extend(settings);
    this.container = document.querySelector(settings.container) as HTMLElement;
    this.slides = this.container.children as HTMLCollectionOf<HTMLElement>;
    this.slideWidth = this.calcslideWidth();
    this.slideDisplay = this.settings.slidesPerView;
    this.container.onpointerdown = pEvent => pointerDown.call(this, pEvent);
    window.addEventListener("resize", () => {
      this.slideWidth = this.calcslideWidth();
    });
  }

  /** updating utilities */
  getTransX(): number {
    return parseFloat(window.getComputedStyle(this.container).transform.split(", ")[4]);
  }
  calcslideWidth(): number {
    return (
      this.slides[0].offsetWidth +
      this.getProperty(this.slides[0], "margin-left") +
      this.getProperty(this.slides[0], "margin-right")
    );
  }
  getProperty(el: HTMLElement, elProp: string): number {
    return parseInt(window.getComputedStyle(el).getPropertyValue(elProp));
  }
  updateContainer(): void {
    this.container = document.querySelector(this.settings.container) as HTMLElement;
    this.slides = this.container.children as HTMLCollectionOf<HTMLElement>;
  }
}

//listeners
function pointerDown(this: Slider, pEvent: PointerEvent) {
  console.log(this.counter);
  this.pos.start = this.getTransX();
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
function mouseMove(this: Slider, mEvent) {
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

function dragStop(this: Slider) {
  document.onmousemove = null;
  document.ontouchmove = null;
  this.container.onpointerdown = null;
  if (this.pos.start != this.getTransX()) {
    if (this.pos.start > this.getTransX()) {
      this.slideNext();
    } else {
      this.slidePrev();
    }
  }
  this.container.dispatchEvent(new CustomEvent("dragStop", {}));
  setTimeout(() => {
    this.container.onpointerdown = pEvent => pointerDown.call(this, pEvent);
    this.container.dispatchEvent(new CustomEvent("transitioned", {}));
  }, this.settings.transitionSpeed);
  document.ontouchend = null;
  document.onmouseup = null;
}

console.timeEnd("loop");
