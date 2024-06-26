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
