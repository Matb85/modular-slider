import type { SliderI } from "@/types";

export default (addClass = "loaded", options: IntersectionObserverInit = { rootMargin: "0px", threshold: 0.5 }) =>
  function lazyloading(this: SliderI) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.intersectionRatio <= 0) return;
        const img = entry.target as HTMLImageElement;
        if (!img.dataset.srcset) img.src = img.dataset.src as string;
        else img.srcset = img.dataset.srcset as string;
        observer.unobserve(img);
        img.addEventListener("load", () => img.classList.add(addClass));
      });
    }, options);
    this.container.querySelectorAll(".ms-lazy").forEach(img => observer.observe(img));
  };
