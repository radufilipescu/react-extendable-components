import { useCallback, useMemo, useState, useRef, useEffect, ReactNode } from "react";
import { XTabsContext, IXTabsContext } from "./XTabsContext";
import { TPropEntry, TPropKey, TPropValue } from "./types";
import { DeepWriteable } from "../../utils/TDeepWriteable";
import { Writeable } from "../../utils/Writeable";

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
  Writeable<
    Omit<IXTabsProps<T>, "default" | "children">
  >
>;

const SYM = Symbol();

export type XTabs<T> = React.FC<IXTabsProps<T>>;

export function newXTabs<T>(inheritedDefaultProps?: IXTabsDefaultProps<any>): XTabs<T> {
  function XTabs<T>(props: IXTabsProps<T>) {
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
  
  XTabs.defaultProps = ({ ...inheritedDefaultProps } as IXTabsDefaultProps<any>);

  return XTabs;
}