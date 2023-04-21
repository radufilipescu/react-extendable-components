import { RefObject, createContext, createRef } from "react";

export type TEnumValue = string | number | symbol;

export interface IXTabsContext {
  readonly selected: TEnumValue;
  readonly onChecked: (val: TEnumValue) => void;
  placeholder: RefObject<HTMLDivElement | null>;
};

const Empty: IXTabsContext = {
  selected: Symbol(),
  onChecked: () => {},
  placeholder: createRef()
};

export const XTabsContext = createContext<IXTabsContext>(Empty);