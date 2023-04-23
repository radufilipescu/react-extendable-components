import { ReactNode, useCallback, useContext } from "react";
import { createPortal } from "react-dom";
import { XTabsContext } from "./XTabsContext";

export interface IXTabProps<T> {
  readonly value: T extends object ? keyof T : T ;
  readonly children: ReactNode | ((value: T extends object ? keyof T : T, isSelected: boolean) => ReactNode);
  readonly render?: ReactNode | ((value: T extends object ? keyof T : T, isSelected: boolean) => ReactNode);
}

export function XTab<T>(props: IXTabProps<T>) {
  const ctx = useContext(XTabsContext);

  const divClickHandler = useCallback<React.MouseEventHandler<HTMLDivElement>>(() => {
    ctx.onChecked(props.value);
  }, [props.value]);

  const isSelected = ctx.selected === props.value;

  const children = typeof props.children === 'function'
    ? props.children(props.value, isSelected)
    : props.children;

  return <>
    <div style={{ display: 'inline-block', cursor: 'pointer' }} onClick={divClickHandler}>
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
    </div>
    {ctx.placeholder.current && isSelected && createPortal(children, ctx.placeholder.current)}
  </>;
}