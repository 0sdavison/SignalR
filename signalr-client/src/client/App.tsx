import React from "react";
import SignalRProvider from "./SignalRContext";

const App: React.FC = () => {
  return (
    <SignalRProvider>
      <h1>TypeScript is awesome</h1>
    </SignalRProvider>
  );
};

export default App;
