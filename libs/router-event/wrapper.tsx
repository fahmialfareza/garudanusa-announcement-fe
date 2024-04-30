import { onComplete } from "@/libs/router-event/event";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

function HandleOnCompleteChild() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => onComplete(), [pathname, searchParams]);
  return null;
}

export function HandleOnComplete() {
  return (
    <Suspense>
      <HandleOnCompleteChild />
    </Suspense>
  );
}
