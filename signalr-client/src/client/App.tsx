import React from "react";
import Button from "./Button";
import SignalRProvider from "./SignalRContext";
import TodoList from "./TodoList";
import TodoStore from "./TodoStore";
import * as api from "./services/api";

import "../../public/style.css";

const App: React.FC = () => {
  return (
    <div className="APP justify-center">
      <SignalRProvider>
        <TodoStore>{(todos) => <TodoList todos={todos} />}</TodoStore>
        <Button
          onClick={() => {
            return api.createTodo({ id: 2, name: "bar", isComplete: false });
          }}
        >
          Create New
        </Button>
      </SignalRProvider>
    </div>
  );
};

export default App;
