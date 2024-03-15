"use client";

import { PropsWithChildren, useRef } from "react";

export function Tooltip({
  message,
  children,
}: PropsWithChildren<{ message: string }>) {
  const tooltipRef = useRef<HTMLSpanElement>(null);
  const container = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={container}
      onMouseEnter={() => {
        if (!tooltipRef.current || !container.current) return;
        const { left, top } = container.current.getBoundingClientRect();

        tooltipRef.current.style.left = left + 35 + "px";
        tooltipRef.current.style.top = top + "px";
      }}
      className="group flex"
    >
      {children}
      {message ? (
        <span
          ref={tooltipRef}
          className="absolute top-10 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100"
        >
          {message}
        </span>
      ) : null}
    </div>
  );
}
