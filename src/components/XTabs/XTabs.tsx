import { ReactElement, useCallback, useMemo, useState, useRef, useEffect } from "react";
import { XTab } from "./XTab";
import { XTabsContext, IXTabsContext, TEnumValue } from "./XTabsContext";

export interface IXTabsProps<T extends TEnumValue> {
  readonly default: T;
  readonly children: ReactElement<typeof XTab>[];
}

const SYM = Symbol();

export function XTabs<T extends TEnumValue>(props: IXTabsProps<T>) {
  const [selected, setSelected] = useState<TEnumValue>(SYM);
  const onChecked = useCallback<(val: TEnumValue) => void>((val) => setSelected(val), [setSelected]);
  const tabContentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setSelected(props.default);
  }, []);
  const xContext = useMemo<IXTabsContext>(() => ({ selected, onChecked, placeholder: tabContentRef }), [selected]);
  return (
    <XTabsContext.Provider value={xContext}>
      <div>
        <div>
          {props.children}
        </div>
        <div ref={tabContentRef} />
      </div>
    </XTabsContext.Provider>
  );
}