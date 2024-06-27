import React, { useEffect, useState } from "react";
import { SignalRContext } from "./SignalRContext";
import { Todo } from "./types/todo";
import { DbNotification } from "./types/dbNotification";
import * as api from "./services/api";

export interface TodoStoreProps {
  children: (todos: Todo[]) => React.ReactElement;
}

const TodoStore: React.FunctionComponent<Readonly<TodoStoreProps>> = ({
  children,
}) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    // api.listTodos().then(setTodos);
  }, []);

  SignalRContext.useSignalREffect(
    "TODO_ADDED",
    (message) => {
      setTodos((todos) => [...todos, message]);
    },
    []
  );

  SignalRContext.useSignalREffect(
    "DB_NOTIFICATION",
    (message) => {
      console.log(message);
      const notification = JSON.parse(message) as DbNotification;

      switch (notification.action) {
        case "INSERT":
          setTodos((todos) => [...todos, notification.data]);
          break;
        case "UPDATE":
          setTodos((todos) => [
            ...todos.filter((todo) => todo.id === notification.data.id),
            notification.data,
          ]);
          break;
        case "DELETE":
          setTodos((todos) =>
            todos.filter((todo) => todo.id === notification.data.id)
          );
          break;
      }
    },
    []
  );

  return children(todos);
};

export default TodoStore;
