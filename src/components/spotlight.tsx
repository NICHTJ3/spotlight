import React, {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { search as fuzzySearch } from "fast-fuzzy";
import clsx from "clsx";
import { useKeyPress } from "../hooks/useKeyPress";
import { useFocusTrap } from "../hooks/useFocusTrap";

export type Action = { name: string; callback: () => void };

const SpotlightContext = React.createContext<{
  data: Action[];
  addAction: (action: Action) => void;
}>({
  data: [],
  addAction: () => {
    throw new Error("`addAction` was not implemented in `SpotlightContext`");
  },
});

export function SpotlightProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Array<Action>>([]);

  return (
    <SpotlightContext.Provider
      value={{
        data: items,
        addAction: (action) => {
          setItems((items) => [...items, action]);
        },
      }}
    >
      {children}
    </SpotlightContext.Provider>
  );
}

export function useSpotlightAction(action: Action) {
  // TODO: Throw if not used in useContext
  const { addAction } = useContext(SpotlightContext);
  useEffect(() => {
    addAction(action);
  }, []);
}

export function Spotlight({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;
  const { data } = useContext(SpotlightContext);

  const [search, setSearch] = useState("");
  const [cursor, setCursor] = useState(0);

  const items = useMemo(() => {
    if (search === "") return data;
    return fuzzySearch(search, data, {
      keySelector: (i) => i.name,
      normalizeWhitespace: true,
    });
  }, [search, data]);

  const selected = useMemo(() => items.at(cursor), [cursor, items]);

  const onClick = () => {
    selected?.callback();
    onClose();
  };

  const wrapCursor = useCallback(
    (cursor: number) => Math.abs(cursor % items.length),
    [items]
  );

  const ref = useRef<HTMLInputElement>(null);
  // Focus search box on spotlight open
  useEffect(() => {
    ref.current?.focus();
  }, []);

  useKeyPress({
    ref,
    key: "ArrowDown",
    callback: () => {
      setCursor((cursor) => wrapCursor(cursor + 1));
    },
  });
  useKeyPress({
    ref,
    key: "Tab",
    callback: () => {
      setCursor((cursor) => wrapCursor(cursor + 1));
    },
  });
  useKeyPress({
    ref,
    key: "Tab",
    modifiers: ["shift"],
    callback: () => {
      setCursor((cursor) => wrapCursor(cursor - 1));
    },
  });

  useKeyPress({
    ref,
    key: "ArrowUp",
    callback: () => {
      setCursor((cursor) => wrapCursor(cursor - 1));
    },
  });

  useKeyPress({
    ref,
    key: "Enter",
    callback: () => {
      onClick();
    },
  });

  useKeyPress({
    ref,
    key: "Escape",
    callback: () => {
      onClose();
    },
  });

  const focusTrap = useFocusTrap();

  return (
    <>
      {/* NOTE: The below is the background shaddow */}
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" />
      <div
        ref={focusTrap}
        className={
          "left-0 right-0 bg-white mt-24 mx-auto max-w-md absolute border w-full rounded-md shadow-md"
        }
      >
        <input
          value={search}
          ref={ref}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          onBlur={() => {
            onClose();
          }}
          className={"w-full p-2 shadow-sm"}
          placeholder={"Search..."}
        />
        <ul className="divide-y">
          {items.map((action, index) => {
            return (
              <li
                className={clsx(
                  "hover:bg-gray-300 rounded-sm py-1 px-2 cursor-pointer",
                  cursor === index && "bg-gray-200"
                )}
                key={action.name}
                onClick={onClick}
              >
                {action.name}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
