import React from "react";
import SignalRProvider from "./SignalRContext";
import TodoStore from "./TodoStore";
import TodoList from "./TodoList";
import "../../public/style.css";

const App: React.FC = () => {
  return (
    <div className="APP justify-center">
      <SignalRProvider>
        <TodoStore>{(todos) => <TodoList todos={todos} />}</TodoStore>
      </SignalRProvider>
    </div>
  );
};

export default App;
