import { Todo } from "./todo";

export interface DbNotification {
  table: "todos";
  action: "INSERT" | "UPDATE" | "DELETE";
  data: Todo;
}
