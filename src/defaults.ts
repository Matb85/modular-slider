const defaults = {
  transitionSpeed: 300,
  interval: false,
  intervalPeriod: 5000,
  carousel: false,
  navigation: null,
  pagination: null,
  initialSlide: 1,
  slidesPerView: 2,
  container: "",
};

export interface Defaults {
  transitionSpeed?: number;
  interval?: boolean;
  intervalPeriod?: number;
  carousel?: boolean;
  navigation?: null;
  pagination?: null;
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
