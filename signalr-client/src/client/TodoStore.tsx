import React, { useEffect, useState } from "react";
import { SignalRContext } from "./SignalRContext";
import { Todo } from "./types/todo";
import * as api from "./services/api";

export interface TodoStoreProps {
  children: (todos: Todo[]) => React.ReactElement;
}

const TodoStore: React.FunctionComponent<Readonly<TodoStoreProps>> = ({
  children,
}) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    api.listTodos().then(setTodos);
  }, []);

  SignalRContext.useSignalREffect(
    "TODO_ADDED",
    (message) => {
      setTodos((todos) => [...todos, message]);
    },
    []
  );

  return children(todos);
};

export default TodoStore;
