import { PropsWithChildren } from "react";
import { BaseProps } from "./types";
import { Action } from "../Action";
import { twMerge } from "tailwind-merge";

export function Button({
  className,
  active,
  reversed,
  ...props
}: PropsWithChildren<
  {
    active: boolean;
    reversed?: boolean;
  } & BaseProps
>) {
  return (
    <Action
      as="button"
      {...props}
      className={twMerge(
        "cursor-pointer",
        reversed
          ? active
            ? "text-white"
            : "text-[#aaa]"
          : active
          ? "text-black"
          : "text-[#ccc]",
        className
      )}
    />
  );
}
