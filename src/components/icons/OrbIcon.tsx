import { SVGProps } from "react";

export const OrbIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12 21L10 20M12 21L14 20M12 21V18.5M6 18L4 17V14.5M4 9.5V7M4 7L6 6M4 7L6 8M10 4L12 3L14 4M18 6L20 7M20 7L18 8M20 7V9.5M12 11L10 10M12 11L14 10M12 11V13.5M18 18L20 17V14.5"
      stroke="#000000"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
