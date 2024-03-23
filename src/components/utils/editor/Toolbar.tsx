import { PropsWithChildren } from "react";
import { BaseProps } from "./types";
import { twMerge } from "tailwind-merge";

export function Menu({ className, ...props }: PropsWithChildren<BaseProps>) {
  return (
    <div {...props} className={twMerge("inline-block [&>*]:ml-4", className)} />
  );
}

export function Toolbar({ className, ...props }: PropsWithChildren<BaseProps>) {
  return (
    <Menu {...props} className={twMerge("relative my-0 -mx-5 ", className)} />
  );
}
