import { useEffect, useRef } from "react";

export function useFocusTrap() {
  const elRef = useRef<HTMLDivElement>(null);

  function handleFocus(e: KeyboardEvent) {
    const focusableEls: any = elRef.current?.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
    const firstFocusableEl = focusableEls?.[0];
    const lastFocusableEl = focusableEls?.[focusableEls.length - 1];

    var isTabPressed = e.key === "Tab";

    if (!isTabPressed) {
      return;
    }

    e.preventDefault();

    if (e.shiftKey) {
      /* shift + tab */ if (document.activeElement === firstFocusableEl) {
        lastFocusableEl?.focus();
        e.preventDefault();
      }
    } /* tab */ else {
      if (document.activeElement === lastFocusableEl) {
        firstFocusableEl?.focus();
        e.preventDefault();
      }
    }
  }

  useEffect(() => {
    elRef.current?.addEventListener("keydown", handleFocus);

    return () => {
      elRef.current?.removeEventListener("keydown", handleFocus);
    };
  }, []);

  return elRef;
}
