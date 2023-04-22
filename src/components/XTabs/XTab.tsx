import { ReactNode, useCallback, useContext } from "react";
import { createPortal } from "react-dom";
import { XTabsContext } from "./XTabsContext";

export interface IXTabProps<T> {
  readonly value: T;
  readonly children: ReactNode;
  readonly render?: ReactNode | ((value: T, isSelected: boolean) => ReactNode);
}

export function XTab<T>(props: IXTabProps<T>) {
  const ctx = useContext(XTabsContext);

  const divClickHandler = useCallback<React.MouseEventHandler<HTMLDivElement>>(() => {
    ctx.onChecked(props.value);
  }, [props.value]);

  const isSelected = ctx.selected === props.value;

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
    {ctx.placeholder.current && isSelected && createPortal(props.children, ctx.placeholder.current)}
  </>;
}