import { ReactNode, useCallback, useContext } from "react";
import { createPortal } from "react-dom";
import { XTabsContext, TEnumValue } from "./XTabsContext";

export interface IXTabProps {
  readonly value: TEnumValue;
  readonly children: ReactNode;
}

export function XTab(props: IXTabProps) {
  const ctx = useContext(XTabsContext);
  
  const radioChangedHandler = useCallback<React.ChangeEventHandler<HTMLInputElement>>((ev) => {
    if (ev.target.checked) 
      ctx.onChecked(props.value);
  }, [props.value]);

  const divClickHandler = useCallback<React.MouseEventHandler<HTMLDivElement>>(() => {
    ctx.onChecked(props.value);
  }, [props.value]);

  const isSelected = ctx.selected === props.value;

  return <>
    <div style={{ display: 'inline-block' }} onClick={divClickHandler}>
      <input type="radio" checked={isSelected} onChange={radioChangedHandler} />
    </div>
    {ctx.placeholder.current && isSelected && createPortal(props.children, ctx.placeholder.current)}
  </>;
}