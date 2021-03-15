console.time("loop");
import { extend, Defaults } from "./defaults";
import carousel from "./init/carousel";
import noloop from "./init/noloop";
export { carousel, noloop };

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
    this.container = document.querySelector(settings.container)!;
    this.slides = this.container.children as HTMLCollectionOf<HTMLElement>;
    this.slideWidth = this.calcslideWidth();
    this.slideDisplay = this.settings.slidesPerView;
    this.container.onpointerdown = pEvent => pointerDown.call(this, pEvent);
    window.addEventListener("resize", () => {
      this.slideWidth = this.calcslideWidth();
    });

    // if (this.settings.interval == true) interval.call(this);
    // if (this.settings.pagination != null) pagination.call(this);
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
    this.container = document.querySelector(this.settings.container)!;
    this.slides = this.container.children as HTMLCollectionOf<HTMLElement>;
  }
}

//listeners
function pointerDown(this: Slider, pEvent: PointerEvent) {
  console.log(this.counter);
  this.pos.start = this.getTransX();
  this.pos.x2 = this.container.clientX;
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

//slider types

/*

//buttons
function buttons() {
  this.nextBtn = document.querySelector(this.settings.navigation.nextBtn);
  this.prevBtn = document.querySelector(this.settings.navigation.prevBtn);

  let btnAct = params => {
    this.slideBy(params.dist);
    this.container.dispatchEvent(new PointerEvent("pointerdown", {}));
    params.btn.onclick = null;
    setTimeout(() => {
      this.container.dispatchEvent(new CustomEvent("dragStop", {}));
      params.btn.onclick = clEvent => {
        btnAct(params, clEvent);
      };
    }, this.settings.transitionSpeed);
  };
  this.nextBtn.onclick = clEvent => {
    btnAct(
      {
        btn: this.nextBtn,
        dist: 2,
      },
      clEvent
    );
  };

  this.prevBtn.onclick = clEvent => {
    btnAct(
      {
        btn: this.prevBtn,
        dist: -2,
      },
      clEvent
    );
  };
}

function pagination() {
  let types = {
    normal: el => {
      dots.forEach(element => {
        element.classList.remove(this.settings.pagination.addClass);
      });
      el.classList.add(this.settings.pagination.addClass);
    },
    multiple: el => {
      dots.forEach(element => {
        element.classList.remove(...this.settings.pagination.addClass);
      });
      el.classList.add(this.settings.pagination.addClass[0]);
      for (let i = 0; i < this.settings.pagination.addClass.length; i++) {
        if (dots[whichdot(el) + i]) dots[whichdot(el) + i].classList.add(this.settings.pagination.addClass[i]);
        if (dots[whichdot(el) - i]) dots[whichdot(el) - i].classList.add(this.settings.pagination.addClass[i]);
      }
    },
  };
  let whichdot = dot => {
    for (let i = 0; i < dots.length; i++) if (Object.values(dots)[i] === dot) return i;
  };
  let addDotClickHandler = () => {
    dots.forEach(element => {
      element.onclick = () => {
        this.slideTo(whichdot(element));
        types[this.settings.pagination.type](element);
        this.container.addEventListener(
          "transitionend",
          () => {
            addDotClickHandler();
          },
          { once: true }
        );
        dots.forEach(el => {
          el.onclick = null;
        });
      };
    });
  };
  let pagcontainer = document.querySelector(this.settings.pagination.container);
  let dots = document.querySelector(this.settings.pagination.dots);
  pagcontainer.innerHTML = "";
  for (
    let i = 0, dotsamount = this.settings.carousel ? this.slides.length : this.slides.length - this.slideDisplay + 1;
    i < dotsamount;
    i++
  )
    pagcontainer.appendChild(dots.cloneNode(true));
  dots = document.querySelectorAll(this.settings.pagination.dots);
  addDotClickHandler();
  types[this.settings.pagination.type](dots[Math.abs(this.counter)]);
  console.log(Math.abs(this.counter));
  this.container.addEventListener("dragStop", () => {
    types[this.settings.pagination.type](dots[Math.abs(this.counter)]);
  });
}

//interval
function interval() {
  var autoplay = setInterval(() => {
    this.slideNext();
  }, this.settings.intervalPeriod);
  this.container.addEventListener("pointerdown", () => {
    clearInterval(autoplay);
    autoplay = null;
  });
  this.container.addEventListener("dragStop", () => {
    autoplay = setInterval(() => {
      this.slideNext();
    }, this.settings.intervalPeriod);
  });
}
*/

console.timeEnd("loop");
