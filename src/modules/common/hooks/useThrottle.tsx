import { useCallback, ChangeEvent } from "react";
import _ from "lodash";

export default function useDebounce(
  callback: (event: ChangeEvent<HTMLInputElement>) => void,
  time: number
) {
  return useCallback(
    //@ts-ignore
    _.debounce((...args: any) => callback(...args), time),
    [callback, time]
  );
}
