import React from "react";
import { Action, useSpotlightAction } from "./spotlight";

export function ActionButton({
  label,
  action,
}: {
  label: string;
  action: Action;
}) {
  useSpotlightAction(action);

  return (
    <button
      onClick={() => {
        action.callback();
      }}
    >
      {label ? label : action.name}
    </button>
  );
}
