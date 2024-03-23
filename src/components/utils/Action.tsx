import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { LinkProps } from "next/link";
import LinkTransition from "./LinkTransition";

interface ActionAsButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  as?: "button";
}

interface ActionAsLink
  extends PropsWithChildren<LinkProps & { className?: string }> {
  as?: "link";
}

type ActionProps = ActionAsButton | ActionAsLink;

export function Action(props: ActionProps) {
  if (props.as === "link") {
    const { as, href, children, className, ...rest } = props;

    return (
      <LinkTransition {...rest} href={href} className={className}>
        {children}
      </LinkTransition>
    );
  }

  if (props.as === "button") {
    const { as, ...rest } = props;

    return <button {...rest} />;
  }
}
