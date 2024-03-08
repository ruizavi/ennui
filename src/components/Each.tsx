import React, { Children } from "react";

interface Props<T = unknown> {
  of: T[];
  render(item: T): React.ReactElement;
}

export function Each<T = unknown>({ render, of }: Props<T>) {
  return Children.toArray(of.map((item) => render(item)));
}
