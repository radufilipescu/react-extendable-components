import { ReactNode } from "react";
import { IXTabsProps, newXTabs } from "./XTabs";
import { TPropEntry, TPropKey, TPropValue } from "./types";

export interface IGenTabsProps<T> {
  readonly tabsComp?: React.ComponentType<IXTabsProps<T>>;
  readonly entries: TPropEntry<T>[];
  readonly default: TPropKey<T>;
  readonly render: (propKey: TPropKey<T>, propValue: TPropValue<T>) => ReactNode;
}

export function GenTabs<T>(props: IGenTabsProps<T>) {
  const Tabs = props.tabsComp ?? newXTabs<T>();
  return <Tabs default={props.default}>
    {props.entries.map(entry => props.render(entry[0], entry[1]))}
  </Tabs>;
}