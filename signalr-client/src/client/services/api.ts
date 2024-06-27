import { Todo } from "../types/todo";
import { CONFIG } from "../../config";

export const listTodos = (): Promise<Todo[]> =>
  fetch(CONFIG.signalRServerUrl + "/todoitems", {
    method: "GET",
  }).then((response) => response.json());

export const createTodo = (todo: Todo) =>
  fetch(CONFIG.signalRServerUrl + "/todoitems", {
    headers: [["Content-Type", "application/json"]],
    method: "POST",
    body: JSON.stringify(todo),
  });

export const updateTodo = (todo: Todo) =>
  fetch(CONFIG.signalRServerUrl + "/todoitems/" + todo.id, {
    headers: [["Content-Type", "application/json"]],
    method: "PUT",
    body: JSON.stringify(todo),
  });

export const deleteTodo = (id: number) =>
  fetch(CONFIG.signalRServerUrl + "/todoitems/" + id, {
    method: "DELETE",
  });
