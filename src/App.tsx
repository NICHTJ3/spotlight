import React, { useState } from "react";
import { ActionButton } from "./components/ActionButton";
import { Spotlight, SpotlightProvider } from "./components/spotlight";
import { useKeyPress } from "./hooks/useKeyPress";

export const App = () => {
  const [spotlightOpen, setSpotlightOpen] = useState(true);

  useKeyPress({
    key: "Space",
    callback: () => setSpotlightOpen((open) => !open),
    modifiers: ["ctrl"],
  });

  return (
    <SpotlightProvider>
      <Spotlight
        open={spotlightOpen}
        onClose={() => {
          setSpotlightOpen(false);
        }}
      />
      <div className={"pt-10"}>
        <ActionButton
          label="Test spotlight button"
          action={{ name: "Test", callback: () => console.log("Testing") }}
        />
        <ActionButton
          label="Test spotlight button 2"
          action={{ name: "Test 2", callback: () => console.log("Testing 2") }}
        />
        <ActionButton
          label="Test spotlight button 3"
          action={{
            name: "Kill page",
            callback: () => console.log("Testing 2"),
          }}
        />
        <ActionButton
          label="Test spotlight button 4"
          action={{
            name: "Kill page 2",
            callback: () => console.log("Testing 2"),
          }}
        />
      </div>
    </SpotlightProvider>
  );
};
