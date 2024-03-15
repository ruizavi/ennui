"use client";

import { useExpand } from "@/hooks/useExpand";
import { SIDEBAR_EXPAND } from "@/libs/const";

export const ToggleButton = () => {
  const { location, toggle } = useExpand();
  return (
    <button
      className="group absolute left-0 top-1/2 hidden -translate-y-1/2 xl:!block outline-none"
      onClick={() => toggle(SIDEBAR_EXPAND)}
    >
      <div className="flex h-[72px] w-8 items-center justify-center">
        <div className="flex h-8 w-6 flex-col items-center">
          <div
            className={`h-4 w-1 translate-y-[0.15rem] rounded-full bg-neutral-300 transition duration-200 ${
              location[SIDEBAR_EXPAND]
                ? "group-hover:rotate-[20deg]"
                : "group-hover:-rotate-[20deg]"
            }`}
          ></div>
          <div
            className={`h-4 w-1 -translate-y-[0.15rem] rounded-full bg-neutral-300 transition duration-200 ${
              location[SIDEBAR_EXPAND]
                ? "group-hover:-rotate-[20deg]"
                : "group-hover:rotate-[20deg]"
            }`}
          ></div>
        </div>
      </div>
    </button>
  );
};
