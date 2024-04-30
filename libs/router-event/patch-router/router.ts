import { onStart } from "@/libs/router-event/event";
import { shouldTriggerStartEvent } from "@/libs/router-event/should-trigger-start-events";
import { useRouter as useRouterOriginal } from "next/navigation";

export function useRouter(): ReturnType<typeof useRouterOriginal> {
  const router = useRouterOriginal();
  return {
    ...router,
    push: (href, options) => {
      if (shouldTriggerStartEvent(href)) onStart();
      router.push(href, options);
    },
    replace: (href, options) => {
      if (shouldTriggerStartEvent(href)) onStart();
      router.replace(href, options);
    },
  };
}
