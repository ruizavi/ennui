/* eslint-disable react/display-name */
import React, { ReactNode, PropsWithChildren } from "react";
import ReactDOM from "react-dom";

interface BaseProps {
  className: string;
  [key: string]: unknown;
}
type OrNull<T> = T | null;

export const EditorValue = React.forwardRef(
  ({
    className,
    value,
    ...props
  }: PropsWithChildren<
    {
      value: any;
    } & BaseProps
  >) => {
    const textLines = value.document.nodes
      .map((node: { text: any }) => node.text)
      .toArray()
      .join("\n");
    return (
      <div {...props}>
        <div>Slates value as text</div>
        <div>{textLines}</div>
      </div>
    );
  }
);

export const Instruction = React.forwardRef(
  ({ className, ...props }: PropsWithChildren<BaseProps>) => <div {...props} />
);

export const Portal = ({ children }: { children?: ReactNode }) => {
  return typeof document === "object"
    ? ReactDOM.createPortal(children, document.body)
    : null;
};
