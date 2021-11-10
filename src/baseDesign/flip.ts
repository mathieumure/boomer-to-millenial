/**
 * Basic implementation of the FLIP technique (First, Last, Invert, Play)
 * (https://aerotwist.com/blog/flip-your-animations/)
 * made for this specific use case
 */
export class Flip {
  private positions: { [id: string]: DOMRect };

  constructor() {
    this.positions = {};
  }

  read(elements: NodeListOf<HTMLElement>) {
    this.positions = {};
    elements.forEach((item) => {
      const id = item.dataset.flipid;
      if (id) {
        this.positions[id] = item.getBoundingClientRect(); // FIRST
      }
    });
  }

  play(elements: NodeListOf<HTMLElement>) {
    elements.forEach((item) => {
      const id = item.dataset.flipid;
      if (!id || !this.positions[id]) {
        return;
      }

      const first = this.positions[id];
      const last = item.getBoundingClientRect(); // LAST

      // INVERT
      const deltaX = first.left - last.left;
      const deltaY = first.top - last.top;

      // PLAY

      if (deltaX === 0 && deltaY === 0) {
        return; // avoid side effects due to transform: "none" below
      }

      // --- experimental Web Animation API ---
      item.animate(
        [
          { transform: `translate(${deltaX}px, ${deltaY}px)` },
          { transform: "none" },
        ],
        { duration: 300, easing: "cubic-bezier(0.4, 0.0, 0.2, 1)" }
      );

      // --- old school animation ---
      // item.style.transition = "none";
      // item.style.transform = `translate(${deltaX}px, ${deltaY}px)`;

      // requestAnimationFrame(() => {
      //   item.style.transition =
      //     "transform 300ms cubic-bezier(0.4, 0.0, 0.2, 1)";
      //   item.style.transform = "none";

      //   // clean up
      //   item.addEventListener(
      //     "transitionend",
      //     () => item.removeAttribute("style"),
      //     { once: true }
      //   );
      // });
    });
  }
}
