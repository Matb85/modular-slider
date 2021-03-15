const defaults = {
  transitionSpeed: 300,
  interval: 1000,
  navigation: undefined,
  pagination: undefined,
  initialSlide: 1,
  slidesPerView: 2,
  container: "",
};

export interface Defaults {
  transitionSpeed?: number;
  interval?: number;
  navigation?: {
    nextBtn: string;
    prevBtn: string;
  };
  pagination?: {
    container: string;
    dots: string;
    type: "normal" | "multiple";
    addClass: string | string[];
  };
  initialSlide?: number;
  slidesPerView: number;
  container: string;
}

export default defaults;

export function extend(options: Defaults): Defaults {
  const extended = Object.assign({}, defaults);
  for (const counter in defaults) {
    if (options[counter]) {
      extended[counter] = options[counter];
    }
  }
  return extended;
}
