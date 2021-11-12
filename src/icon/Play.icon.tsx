import { FC } from "react";

export const PlayIcon: FC<{
  size?: number;
  fill?: string;
}> = ({ size = 20, fill = "currentColor" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15.192 11.3934L2.466 18.7774C1.386 19.4034 0 18.6454 0 17.3834V2.61545C0 1.35544 1.384 0.595445 2.466 1.22344L15.192 8.60745C15.4377 8.74769 15.6419 8.95042 15.7839 9.19506C15.926 9.4397 16.0008 9.71756 16.0008 10.0004C16.0008 10.2833 15.926 10.5612 15.7839 10.8058C15.6419 11.0505 15.4377 11.2532 15.192 11.3934Z"
      fill={fill}
    />
  </svg>
);
