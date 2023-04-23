import { useMemo } from "react";
import { TPropEntry } from "./types";

export function useObjectEntries<T extends object>(obj: T) {
  return useMemo(() => (
    Object.entries(obj) as TPropEntry<T>[]
  ), [obj]);
}