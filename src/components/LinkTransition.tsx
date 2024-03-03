import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";

function LinkTransition({
  href,
  children,
  ...props
}: PropsWithChildren<LinkProps & { className?: string }>) {
  const router = useRouter();
  const handleClick = (e: any) => {
    if (!document.startViewTransition) {
      // browser does not support view transition. Continue the default behavior.
      return;
    } else {
      // browser supports view transition. Animate the transtion.
      e.preventDefault();
      document.startViewTransition(() => {
        router.push(href.toString());
      });
    }
  };

  return (
    <Link onClick={handleClick} href={href} {...props}>
      {children}
    </Link>
  );
}
export default LinkTransition;
