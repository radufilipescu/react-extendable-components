import React, { ReactNode, useCallback, useContext } from "react";
import { createPortal } from "react-dom";
import { XTabsContext } from "./XTabsContext";
import { TPropKey } from "./types";

export interface IXTabProps<T> {
  readonly tabComp?: React.ComponentType<any>;
  readonly value: TPropKey<T>;
  readonly children: ReactNode | ((value: TPropKey<T>, isSelected: boolean) => ReactNode);
  readonly render?: ReactNode | ((value: TPropKey<T>, isSelected: boolean) => ReactNode);
}

export type IXTabDefaultProps<T> = Partial<
  Omit<IXTabProps<T>, "default" | "children">
>;

function Div({ children, ...rest}: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
  return <div {...rest}>{children}</div>;
}

export type XTab<T> = React.FC<IXTabProps<T>>;

export function newXTab<T>(inheritedDefaultProps?: IXTabDefaultProps<any>): XTab<T> {
  function XTab<T>(props: IXTabProps<T>) {
    const ctx = useContext(XTabsContext);
  
    const divClickHandler = useCallback<React.MouseEventHandler<HTMLDivElement>>(() => {
      ctx.onChecked(props.value);
    }, [props.value]);
  
    const isSelected = ctx.selected === props.value;
  
    const children = typeof props.children === 'function'
      ? props.children(props.value, isSelected)
      : props.children;
  
    const TabComp = props.tabComp ?? Div;
  
    return <>
      <TabComp style={{ display: 'inline-block', cursor: 'pointer' }} onClick={divClickHandler}>
        {ctx.beforeTabLabel 
          ? typeof ctx.beforeTabLabel === 'function'
            ? ctx.beforeTabLabel(props.value, isSelected)
            : ctx.beforeTabLabel
          : undefined}
        {props.render
          ? typeof props.render === 'function'
            ? props.render(props.value, isSelected)
            : props.render
          : props.value?.toString() ?? ''}
      </TabComp>
      {ctx.placeholder.current && isSelected && createPortal(children, ctx.placeholder.current)}
    </>;
  }
  
  XTab.defaultProps = ({ ...inheritedDefaultProps } as IXTabDefaultProps<any>);

  return XTab;
}