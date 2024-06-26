import React from "react";
import SignalRProvider from "./SignalRContext";
import ConnectionStatus from "./ConnectionStatus";

const App: React.FC = () => {
  return (
    <SignalRProvider>
      <ConnectionStatus />
    </SignalRProvider>
  );
};

export default App;
