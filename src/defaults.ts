const defaults = {
  transitionSpeed: 300,
  initialSlide: 0,
  container: "",
  plugins: [],
};

export interface Defaults {
  container: string;
  plugins?: Array<() => void>;
  transitionSpeed?: number;
  initialSlide?: number;
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
