import React, { useEffect, useState } from "react";
import { SignalRContext } from "./SignalRContext";
import { Todo } from "./types/todo";

export interface TodoStoreProps {
  children: (todos: Todo[]) => React.ReactElement;
}

const TodoStore: React.FunctionComponent<Readonly<TodoStoreProps>> = ({
  children,
}) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  SignalRContext.useSignalREffect(
    "messageReceived",
    (message) => {
      setTodos([...todos, message]);
    },
    []
  );

  return children(todos);
};

export default TodoStore;
