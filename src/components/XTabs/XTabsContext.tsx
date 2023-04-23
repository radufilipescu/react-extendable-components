import { ReactNode, RefObject, createContext, createRef } from "react";

export interface IXTabsContext<T> {
  readonly selected: T extends object ? keyof T : T ;
  readonly onChecked: (val: T extends object ? keyof T : T ) => void;
  readonly placeholder: RefObject<HTMLDivElement | null>;
  readonly beforeTabLabel?: ReactNode | ((value: T extends object ? keyof T : T, isSelected: boolean) => ReactNode);
};

function createEmptyContext<T>(): IXTabsContext<T> {
  return {
    selected: Symbol() as T extends object ? keyof T : T,
    onChecked: () => {},
    placeholder: createRef(),
    beforeTabLabel: undefined
  };
}

const EMPTY_CTX = createEmptyContext();

export const XTabsContext = createContext(EMPTY_CTX);