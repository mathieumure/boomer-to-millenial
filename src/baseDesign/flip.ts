type TransformationType = {
  [A in keyof CSSStyleDeclaration]?: CSSStyleDeclaration[A];
};

/**
 * Basic implementation of the FLIP technique (First, Last, Invert, Play)
 * (https://aerotwist.com/blog/flip-your-animations/)
 * made for this specific use case
 */
export class Flip {
  private positions: { [id: string]: DOMRect };
  private readonly withScaling: boolean;
  private readonly withAbsolute: boolean;
  private animationDuration: number;

  constructor(options?: {
    withScaling?: boolean;
    withAbsolute?: boolean;
    animationDuration?: number;
  }) {
    this.positions = {};
    this.animationDuration = options?.animationDuration || 300;
    this.withScaling = options?.withScaling || false;
    this.withAbsolute = options?.withAbsolute || false;
  }

  private getTransformation(first: DOMRect, last: DOMRect): Keyframe {
    const deltaX = first.left - last.left;
    const deltaY = first.top - last.top;
    const transformation: TransformationType = {
      transform: `translate(${deltaX}px, ${deltaY}px)`,
    };

    if (this.withScaling) {
      const ratioWidth = first.width / last.width;
      const ratioHeight = first.height / last.height;
      const transformedHeight = last.height * ratioHeight;
      const transformedWidth = last.width * ratioWidth;
      // We need to take account of the size added by the scale
      const deltaX =
        first.left - last.left + (transformedWidth - last.width) / 2;
      const deltaY =
        first.top - last.top + (transformedHeight - last.height) / 2;
      transformation.transform = `translate(${deltaX}px, ${deltaY}px) scale(${ratioWidth}, ${ratioHeight})`;
    }

    if (this.withAbsolute) {
      transformation.position = "absolute";
    }

    return transformation as Keyframe;
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
      const transformation = this.getTransformation(first, last);

      // PLAY

      if (deltaX === 0 && deltaY === 0) {
        return; // avoid side effects due to transform: "none" below
      }

      // --- experimental Web Animation API ---
      const keyframes = [transformation];

      if (this.withAbsolute) {
        keyframes.push(
          {
            transform: "none",
            position: "absolute",
            offset: 0.99,
          },
          {
            position: "initial",
            offset: 1,
          }
        );
      } else {
        keyframes.push({ transform: "none" });
      }

      item.animate(keyframes, {
        duration: this.animationDuration,
        easing: "cubic-bezier(0.4, 0.0, 0.2, 1)",
      });

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
