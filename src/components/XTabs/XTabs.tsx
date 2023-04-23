import { useCallback, useMemo, useState, useRef, useEffect, ReactNode } from "react";
import { XTabsContext, IXTabsContext } from "./XTabsContext";
import { TPropEntry, TPropKey, TPropValue } from "./types";

export enum TabsContentPlaceholder {
  BeforeTabs = 'before-tabs',
  AfterTabs = 'after-tabs',
}

export interface IXTabsProps<T> {
  readonly default: TPropKey<T> ;
  readonly children: ReactNode;
  readonly beforeTabLabel?: ReactNode | ((value: TPropKey<T>, isSelected: boolean) => ReactNode);
  readonly contentPlaceholder?: TabsContentPlaceholder;
}

export type IXTabsDefaultProps<T> = Partial<
  Omit<IXTabsProps<T>, "default" | "children">
>;

const SYM = Symbol();

export function XTabs<T>(props: IXTabsProps<T>) {
  const [selected, setSelected] = useState<TPropKey<T>>(SYM as any);
  const onChecked = useCallback<(val: TPropKey<T>) => void>((val) => setSelected(val), [setSelected]);
  const tabContentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    setSelected(props.default);
  }, []);
  
  const xContext = useMemo<IXTabsContext<T>>(() => ({ 
    selected, 
    onChecked, 
    placeholder: tabContentRef, 
    beforeTabLabel: props.beforeTabLabel 
  }), [selected]);

  const contentPos = props.contentPlaceholder ?? TabsContentPlaceholder.AfterTabs;

  return (
    <XTabsContext.Provider value={xContext as any}>
      <div>
        {contentPos === TabsContentPlaceholder.BeforeTabs && <div ref={tabContentRef} />}
        <div>
          {props.children}
        </div>
        {contentPos === TabsContentPlaceholder.AfterTabs && <div ref={tabContentRef} />}
      </div>
    </XTabsContext.Provider>
  );
}

XTabs.defaultProps = ({ } as IXTabsDefaultProps<any>);

export interface IGenTabsProps<T> {
  readonly tabsComp?: React.ComponentType<IXTabsProps<T>>;
  readonly entries: TPropEntry<T>[];
  readonly default: TPropKey<T>;
  readonly render: (propKey: TPropKey<T>, propValue: TPropValue<T>) => ReactNode;
}

export function GenTabs<T>(props: IGenTabsProps<T>) {
  const Tabs = props.tabsComp ?? XTabs<T>;
  return <Tabs default={props.default}>
    {props.entries.map(entry => props.render(entry[0], entry[1]))}
  </Tabs>;
}