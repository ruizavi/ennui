import { SVGProps } from "react";
import { OrbIcon } from "../icons/OrbIcon";

export function BoardFallback(props: SVGProps<SVGSVGElement>) {
  return (
    <ul className="[&>li]:my-1">
      <li>
        <OrbIcon className="mx-auto animate-spin" height={24} width={24} />
      </li>
      <li>
        <OrbIcon className="mx-auto animate-spin" height={24} width={24} />
      </li>
      <li>
        <OrbIcon className="mx-auto animate-spin" height={24} width={24} />
      </li>
    </ul>
  );
}
