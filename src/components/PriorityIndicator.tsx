import React from "react";

type Props = {
  height?: string;
  width?: string;
  color: string;
};

export default function PriorityIndicator({ height, width, color }: Props) {
  return <div data-cy="todo-item-priority-indicator" style={{ margin: 0, width: "9px", height: "9px", backgroundColor: color, borderRadius: "50%" }}></div>;
}
