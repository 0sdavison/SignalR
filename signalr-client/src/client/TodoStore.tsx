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
    api.listTodos().then((todos) => setTodos(sortTodos(todos)));
  }, []);

  const sortTodos = (todos: Todo[]) =>
    todos.sort((a, b) => (a.id < b.id ? -1 : 1));

  SignalRContext.useSignalREffect(
    "DB_NOTIFICATION",
    (message) => {
      const notification = JSON.parse(message) as DbNotification;

      const todo = {
        id: notification.data.Id,
        name: notification.data.Name,
        isComplete: notification.data.IsComplete,
      } as Todo;

      switch (notification.action) {
        case "INSERT":
          setTodos((todos) => sortTodos([...todos, todo]));
          break;
        case "UPDATE":
          setTodos((todos) =>
            sortTodos([...todos.filter((t) => t.id !== todo.id), todo])
          );
          break;
        case "DELETE":
          setTodos((todos) => sortTodos(todos.filter((t) => t.id !== todo.id)));
          break;
      }
    },
    []
  );

  return children(todos);
};

export default TodoStore;
