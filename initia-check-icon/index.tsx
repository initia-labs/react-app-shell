import type { ScreenSize } from "../utils";

interface InitiaCheckIconProps {
  color: string;
  size: ScreenSize;
}

export const InitiaCheckIcon = ({ color, size }: InitiaCheckIconProps) => (
  <svg
    className={`initia-check-icon ${color} ${size}`}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="m1.633 8.707 1.414-1.414 3.182 3.182 6.718-6.718 1.414 1.415-8.132 8.131z" />
  </svg>
);
