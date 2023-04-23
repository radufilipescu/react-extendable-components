import { useCallback, useMemo, useState, useRef, useEffect, ReactNode } from "react";
import { XTabsContext, IXTabsContext } from "./XTabsContext";
import { XTab } from "./XTab";

export enum ContentPlaceholder {
  BeforeTabs = 'before-tabs',
  AfterTabs = 'after-tabs',
}

export interface IXTabsProps<T> {
  readonly default: T extends object ? keyof T : T ;
  readonly children: ReactNode;
  readonly beforeTabLabel?: ReactNode | ((value: T extends object ? keyof T : T, isSelected: boolean) => ReactNode);
  readonly contentPlaceholder?: ContentPlaceholder;
}

export type IXTabsDefaultProps<T> = Partial<
  Omit<IXTabsProps<T>, "default" | "children">
>;

const SYM = Symbol();

export function XTabs<T>(props: IXTabsProps<T>) {
  const [selected, setSelected] = useState<T extends object ? keyof T : T>(SYM as any);
  const onChecked = useCallback<(val: T extends object ? keyof T : T) => void>((val) => setSelected(val), [setSelected]);
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

type TPropEntry<T> = [
  T extends object ? keyof T : T,
  T extends object ? T[keyof T] : T
];

export interface IGenTabsProps<T> {
  readonly entries: TPropEntry<T>[];
  readonly default: T extends object ? keyof T : T;
  readonly render: (prop: TPropEntry<T>, isSelected: boolean) => [ReactNode, ReactNode];
}

type TRenderXTabPart<T> = (value: T extends object ? keyof T : T, isSelected: boolean) => ReactNode;

export function GenTabs<T>(props: IGenTabsProps<T>) {
  const result: [TRenderXTabPart<T>, TRenderXTabPart<T>][] = props.entries.map((entry) => {
    return [
      (value, isSelected) => {
        return props.render(entry, isSelected)[0];
      },
      (value, isSelected) => {
        return props.render(entry, isSelected)[1];
      }
    ]
  });

  return <XTabs<T> default={props.default}>
    {result.map(([renderLabel, renderContent], ndx) => {
      return <XTab<T> key={ndx} value={props.entries[ndx][0]} render={renderLabel}>
        {renderContent}
      </XTab>
    })}
  </XTabs>;
}