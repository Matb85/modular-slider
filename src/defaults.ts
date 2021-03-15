const defaults = {
  transitionSpeed: 300,
  interval: 5000,
  navigation: null,
  pagination: null,
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
  } | null;
  pagination?: {
    container: string;
    dots: string;
    type: "normal" | "multiple";
    addClass: string;
  } | null;
  initialSlide?: number;
  slidesPerView?: number;
  container: string;
}

export default defaults;

export function extend(options: Defaults): Required<Defaults> {
  const extended = Object.assign({}, defaults);
  for (const counter in defaults) {
    if (options[counter]) {
      extended[counter] = options[counter];
    }
  }
  return extended;
}
