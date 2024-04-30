import { onStart } from "@/libs/router-event/event";
import { shouldTriggerStartEvent } from "@/libs/router-event/should-trigger-start-events";
import NextLink from "next/link";
import { forwardRef } from "react";

export const Link = forwardRef<HTMLAnchorElement, React.ComponentProps<"a">>(
  function Link({ href, onClick, ...rest }, ref) {
    const useLink = href && href.startsWith("/");
    if (!useLink) return <a href={href} onClick={onClick} {...rest} />;

    return (
      <NextLink
        href={href}
        onClick={(event) => {
          if (shouldTriggerStartEvent(href, event)) onStart();
          if (onClick) onClick(event);
        }}
        {...rest}
        ref={ref}
      />
    );
  }
);
