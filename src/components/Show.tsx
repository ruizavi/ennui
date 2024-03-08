import React, { Children, PropsWithChildren } from "react";

interface ShowProps {
  children: React.ReactElement | React.ReactElement[];
}

interface WhenProps {
  isTrue?: boolean;
}

export function Show({ children }: ShowProps) {
  let when: React.ReactElement | null = null;
  let otherwise: React.ReactElement | null = null;

  Children.forEach(children, (child) => {
    if (child.props.isTrue === undefined) {
      otherwise = child;
    } else if (!when && child.props.isTrue === true) {
      when = child;
    }
  });

  return when || otherwise;
}

Show.When = ({ isTrue, children }: PropsWithChildren<WhenProps>) =>
  isTrue && children;

Show.Else = ({ children }: PropsWithChildren) => children;
