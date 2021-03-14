console.time("loop");
"use strict";
const defaults = {
  transitionSpeed: 300,
  interval: false,
  intervalPeriod: 5000,
  carousel: false,
  navigation: null,
  pagination: null,
  initialSlide: 1,
  slidesPerView: 1,
};

//object
function Slider(containerName, childrenName, settings) {
  updating.call(this);
  this.settings = extend(defaults, settings);
  this.names = { containerName: containerName, slideName: childrenName };
  this.container = document.querySelector(containerName);
  this.slide = document.querySelectorAll(containerName + " " + childrenName);
  this.pos = { start: 0, x1: 0, x2: 0, y1: 0, y2: 0 };
  this.slideWidth = this.calcslideWidth();
  this.slideDisplay = this.settings.slidesPerView;
  this.counter = 1;
  initslider.call(this);
  if (this.settings.interval == true) interval.call(this);
  if (this.settings.pagination != null) pagination.call(this);
}

//object initiation
function initslider() {
  if (this.settings.carousel == true) {
    carouselType.call(this);
    if (this.slideDisplay + 2 > this.slide.length) {
      do {
        for (i = 0, counter = this.slide.length; i < counter; i++) {
          this.container.appendChild(this.slide[i].cloneNode(true));
          this.updateContainer();
        }
      } while (this.slideDisplay + 2 > this.slide.length);
    }
    this.slidePrev(0);
  } else {
    normalType.call(this);
    this.slideNext(this.settings.initialSlide, 0);
  }
  if (this.settings.navigation != null) {
    buttons.call(this);
  }
  this.container.onpointerdown = pEvent => pointerDown.call(this, pEvent);
}

//listeners
function pointerDown(pEvent) {
  console.log(this.counter);
  this.pos.start = this.getTransX();
  this.pos.x2 = this.container.clientX;
  switch (pEvent.pointerType) {
    case "mouse":
      document.onmousemove = mEvent => mouseMove.call(this, mEvent);
      document.onmouseup = sEvent => dragStop.call(this, sEvent);
      break;
    case "touch":
      document.ontouchmove = tEvent => touchMove.call(this, tEvent);
      document.ontouchend = sEvent => dragStop.call(this, sEvent);
      break;
  }
}
function mouseMove(mEvent) {
  this.pos.x1 = this.pos.x2 - mEvent.clientX;
  this.pos.x2 = mEvent.clientX;
  this.container.style.transform = "translateX(" + (this.getTransX() - this.pos.x1) + "px)";
  this.container.dispatchEvent(new CustomEvent("moving"), {});
}
function touchMove(tEvent) {
  this.pos.x1 = this.pos.x2 - tEvent.touches[0].clientX;
  this.pos.x2 = tEvent.touches[0].clientX;
  this.pos.y1 = this.pos.y2 - tEvent.touches[0].clientY;
  this.pos.y2 = tEvent.touches[0].clientY;
  if (Math.abs(this.pos.y1) < Math.abs(this.pos.x1))
    this.container.style.transform = "translateX(" + (this.getTransX() - this.pos.x1) + "px)";
  this.container.dispatchEvent(new CustomEvent("moving"), {});
}
function dragStop(sEvent) {
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
function carouselType() {
  let countercheck = () => {
    if (this.counter < 0) this.counter = this.slide.length - 1;
    if (this.counter > this.slide.length - 1) this.counter = 0;
  };
  let ending = (direction, dur) => {
    countercheck();
    setTimeout(() => {
      this.container.style.transition = "";
      direction.call(this);
      this.container.style.transform = "translateX(" + this.slideWidth * -1 + "px)";
    }, dur);
  };
  this.slideNext = (dur = this.settings.transitionSpeed) => {
    this.counter++;
    this.container.style.transform = "translateX(" + this.slideWidth * -2 + "px)";
    this.container.style.transition = "transform " + dur + "ms";
    ending(this.move.for, dur);
  };
  this.slidePrev = (dur = this.settings.transitionSpeed) => {
    this.counter--;
    this.container.style.transform = "translateX(" + this.slideWidth * 0 + "px)";
    this.container.style.transition = "transform " + dur + "ms";
    ending(this.move.back, dur);
  };
  this.container.addEventListener("moving", () => {
    if (Math.abs(this.pos.start - this.getTransX()) / this.slideWidth >= 1 && this.pos.x1 != 0) {
      if (this.pos.x1 > 0) {
        this.move.for();
        this.counter++;
      } else {
        this.move.back();
        this.counter--;
      }
      countercheck();
      this.container.style.transform = "translateX(" + this.slideWidth * -1 + "px)";
    }
  });
  this.move = {
    for: () => {
      this.updateContainer();
      this.movedSlide = this.slide[0];
      this.container.appendChild(this.movedSlide);
    },
    back: () => {
      this.updateContainer();
      this.movedSlide = this.slide[this.slide.length - 1];
      this.container.insertBefore(this.movedSlide, this.slide[0]);
    },
  };
  this.slideTo = (to = 0) => {
    this.slideBy(to - Math.abs(this.counter));
  };
  this.slideBy = (dist = 0) => {
    if (dist == 0) return;
    for (let i = 0; i < Math.abs(dist); i++) {
      if (dist > 0) {
        this.counter++;
      } else {
        this.counter--;
      }
      if (this.counter < 0) this.counter = this.slide.length - 1;
      if (this.counter > this.slide.length - 1) this.counter = 0;
    }
    const size = this.slide.length;
    this.move.for();
    this.updateContainer();
    this.container.style.transform = "translateX(0px)";
    this.container.style.transform = "translateX(" + this.getTransX() + ")";
    if (dist > this.slide.length - this.slideDisplay) {
      do {
        for (i = 0; i < size; i++) {
          this.container.appendChild(this.slide[i].cloneNode(true));
          this.updateContainer();
        }
      } while (dist > this.slide.length - this.slideDisplay);
      this.container.addEventListener(
        "transitionend",
        () => {
          do {
            this.container.removeChild(this.slide[this.slide.length - 1]);
            this.updateContainer();
          } while (size < this.slide.length);
        },
        { once: true }
      );
    }
    if (dist < 0) {
      do {
        for (i = 0; i < size; i++) {
          this.container.appendChild(this.slide[i].cloneNode(true));
          this.updateContainer();
        }
      } while (Math.abs(dist) > this.slide.length - this.slideDisplay);
      this.container.style.left = (this.slide.length - size) * -1 * this.slideWidth + "px";
      this.container.style.transform = "translateX(" + this.getTransX() + ")";
      this.container.addEventListener(
        "transitionend",
        () => {
          do {
            this.container.removeChild(this.slide[this.slide.length - 1]);
            this.updateContainer();
          } while (size < this.slide.length);
          this.container.style.left = "0px";
          for (let i = 0; i < Math.abs(dist) + 1; i++) {
            this.move.back();
          }
          this.container.style.transform = "translateX(" + -1 * this.slideWidth + "px)";
        },
        { once: true }
      );
    } else {
      this.container.addEventListener(
        "transitionend",
        () => {
          for (let i = 0; i < dist - 1; i++) {
            this.move.for();
          }
        },
        { once: true }
      );
    }
    this.container.style.transition = "transform " + this.settings.transitionSpeed + "ms";
    this.container.style.transform = "translateX(" + dist * -1 * this.slideWidth + "px)";
    this.container.addEventListener(
      "transitionend",
      () => {
        this.container.style.transition = "";
        this.container.style.transform = "translateX(" + -1 * this.slideWidth + "px)";
      },
      { once: true }
    );
  };
}

function normalType() {
  let base = function(dist, dur) {
    this.counter -= dist;
    if (this.counter > 0) this.counter = 0;
    if (this.counter < -1 * (this.slide.length - this.slideDisplay))
      this.counter = -1 * (this.slide.length - this.slideDisplay);
    this.container.style.transition = "transform " + dur + "ms";
    this.container.style.transform = "translateX(" + this.slideWidth * this.counter + "px)";
    setTimeout(() => {
      this.container.style.transition = "initial";
    }, dur);
  };

  this.slideNext = function(
    dist = Math.ceil((this.pos.start - this.getTransX()) / this.slideWidth),
    dur = this.settings.transitionSpeed
  ) {
    base.call(this, dist, dur);
  };
  this.slidePrev = function(
    dist = Math.floor((this.pos.start - this.getTransX()) / this.slideWidth),
    dur = this.settings.transitionSpeed
  ) {
    base.call(this, dist, dur);
  };
  this.slideTo = (to = 0) => {
    this.slideBy(to - Math.abs(this.counter));
  };
  this.slideBy = (dist = 0) => {
    if (dist == 0) return;
    if (dist > 0) {
      this.slideNext(dist);
    } else {
      this.slidePrev(dist);
    }
  };
}

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
    let i = 0, dotsamount = this.settings.carousel ? this.slide.length : this.slide.length - this.slideDisplay + 1;
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
//updating
function updating() {
  this.getTransX = () => {
    return parseFloat(window.getComputedStyle(this.container).transform.split(", ")[4]);
  };
  this.calcslideWidth = () => {
    return (
      this.slide[0].offsetWidth +
      this.getProperty(this.slide[0], "margin-left") +
      this.getProperty(this.slide[0], "margin-right")
    );
  };
  this.getProperty = (el, elProp) => {
    return parseInt(window.getComputedStyle(el).getPropertyValue(elProp));
  };
  this.updateContainer = () => {
    this.container = document.querySelector(this.names.containerName);
    this.slide = document.querySelectorAll(this.names.containerName + " " + this.names.slideName);
  };
  window.addEventListener("resize", () => {
    this.slideWidth = this.calcslideWidth();
  });
}

//extending specification
function extend(defaults, options) {
  var extended = Object.assign({}, defaults);
  for (let counter in defaults) {
    if (options.hasOwnProperty(counter)) {
      extended[counter] = options[counter];
    }
  }
  return extended;
}

console.timeEnd("loop");
