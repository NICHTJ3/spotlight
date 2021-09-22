import React, { RefObject } from "react";

type Modifier = "alt" | "ctrl" | "meta" | "shift";

const modifierKey: Record<Modifier, (event: KeyboardEvent) => boolean> = {
  ctrl: (event) => event.ctrlKey,
  shift: (event) => event.shiftKey,
  alt: (event) => event.altKey,
  meta: (event) => event.metaKey,
};

export const useKeyPress = function ({
  key,
  ref,
  callback,
  modifiers,
}: {
  key: string;
  ref?: RefObject<HTMLInputElement>;
  callback: () => void;
  modifiers?: Modifier[];
}) {
  function downHandler(e: KeyboardEvent) {
    const modifiersAccepted = !!modifiers?.length
      ? modifiers?.every((modifier) => modifierKey[modifier](e))
      : true;
    if ((e.key === key || e.code === key) && modifiersAccepted) {
      callback();
    }
  }

  React.useEffect(() => {
    const target = ref ? ref.current : document;
    target?.addEventListener("keydown", downHandler);

    return () => {
      target?.removeEventListener("keydown", downHandler);
    };
  });
};
