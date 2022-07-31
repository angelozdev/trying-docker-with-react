import { createResource } from "@/utils/resources";
import { useCallback, useState } from "react";

function useResource<TData>(promise: Promise<TData>) {
  const [resource, setResource] = useState(createResource(promise));

  const retry = useCallback(() => {
    setResource(createResource(promise));
  }, [promise]);


  return { resource, retry };
}

export type TResource<T> = ReturnType<typeof createResource<T>>;

export default useResource;
