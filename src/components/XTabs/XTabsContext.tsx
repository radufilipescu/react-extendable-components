import { ReactNode, RefObject, createContext, createRef } from "react";

export interface IXTabsContext<T> {
  readonly selected: T;
  readonly onChecked: (val: T) => void;
  readonly placeholder: RefObject<HTMLDivElement | null>;
  readonly beforeTabLabel?: ReactNode | ((value: T, isSelected: boolean) => ReactNode);
};

function createEmptyContext<T>(): IXTabsContext<T> {
  return {
    selected: Symbol() as T,
    onChecked: () => {},
    placeholder: createRef(),
    beforeTabLabel: undefined
  };
}

const EMPTY_CTX = createEmptyContext();

export const XTabsContext = createContext(EMPTY_CTX);