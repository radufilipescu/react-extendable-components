import { useCallback, useMemo, useState, useRef, useEffect, ReactNode } from "react";
import { XTabsContext, IXTabsContext } from "./XTabsContext";

export enum ContentPlaceholder {
  BeforeTabs = 'before-tabs',
  AfterTabs = 'after-tabs',
}

export interface IXTabsProps<T> {
  readonly default: T;
  readonly children: ReactNode;
  readonly beforeTabLabel?: ReactNode | ((value: T, isSelected: boolean) => ReactNode);
  readonly contentPlaceholder?: ContentPlaceholder;
}

export type IXTabsDefaultProps<T> = Partial<
  Omit<IXTabsProps<T>, "default" | "children">
>;

const SYM = Symbol();

export function XTabs<T>(props: IXTabsProps<T>) {
  const [selected, setSelected] = useState<T>(SYM as any);
  const onChecked = useCallback<(val: T) => void>((val) => setSelected(val), [setSelected]);
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

  const contentPos = props.contentPlaceholder ?? ContentPlaceholder.AfterTabs;

  return (
    <XTabsContext.Provider value={xContext as any}>
      <div>
        {contentPos === ContentPlaceholder.BeforeTabs && <div ref={tabContentRef} />}
        <div>
          {props.children}
        </div>
        {contentPos === ContentPlaceholder.AfterTabs && <div ref={tabContentRef} />}
      </div>
    </XTabsContext.Provider>
  );
}

XTabs.defaultProps = ({ } as IXTabsDefaultProps<any>);