import { PropsWithChildren } from "react";
import { BaseProps } from "./types";
import { twMerge } from "tailwind-merge";

export function Icon({ className, ...props }: PropsWithChildren<BaseProps>) {
  return (
    <span
      {...props}
      className={twMerge(
        "material-symbols-outlined",
        "text-lg align-text-bottom",
        className
      )}
    />
  );
}
