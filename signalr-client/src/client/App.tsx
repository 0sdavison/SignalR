import React from "react";
import SignalRProvider from "./SignalRContext";
import ConnectionStatus from "./ConnectionStatus";
import TodoStore from "./TodoStore";
import TodoList from "./TodoList";

const App: React.FC = () => {
  return (
    <SignalRProvider>
      <ConnectionStatus />
      <TodoStore>{(todos) => <TodoList todos={todos} />}</TodoStore>
    </SignalRProvider>
  );
};

export default App;
