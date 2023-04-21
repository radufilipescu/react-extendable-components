import { useState } from "react"

export interface IButtonCounterProps {
  readonly label?: string;
}

export function ButtonCounter(props: IButtonCounterProps) {
  const [count, setCount] = useState<number>(0);
  return (
    <button 
      className="button-counter" 
      onClick={() => setCount((countVal) => countVal + 1)}
    >
      {props.label ?? "Useless Clicker count:"} {count}
    </button>
  );
}