const defaults = {
  transitionSpeed: 300,
  pagination: {},
  initialSlide: 1,
  slidesPerView: 2,
  container: "",
  plugins: [],
};

export interface Defaults {
  transitionSpeed?: number;
  plugins?: Array<() => void>;
  pagination: {
    container?: string;
    dots?: string;
    addClass?: string[];
  };
  initialSlide?: number;
  slidesPerView: number;
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
