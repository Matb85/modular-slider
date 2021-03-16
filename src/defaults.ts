const defaults = {
  transitionSpeed: 300,
  initialSlide: 0,
  slidesPerView: 2,
  container: "",
  plugins: [],
};

export interface Defaults {
  transitionSpeed?: number;
  plugins?: Array<() => void>;
  initialSlide?: number;
  slidesPerView: number;
  container: string;
}

export default function extend(options: Defaults): Required<Defaults> {
  const extended = Object.assign({}, defaults);
  for (const counter in defaults) {
    if (options[counter]) {
      extended[counter] = options[counter];
    }
  }
  return extended;
}
