import { ReactNode, RefObject, createContext, createRef } from "react";

export type TEnumValue = string | number | symbol;

export interface IXTabsContext {
  readonly selected: TEnumValue;
  readonly onChecked: (val: TEnumValue) => void;
  readonly placeholder: RefObject<HTMLDivElement | null>;
  readonly beforeTabLabel?: ReactNode | ((value: TEnumValue, isSelected: boolean) => ReactNode);
};

const Empty: IXTabsContext = {
  selected: Symbol(),
  onChecked: () => {},
  placeholder: createRef(),
  beforeTabLabel: undefined
};

export const XTabsContext = createContext<IXTabsContext>(Empty);