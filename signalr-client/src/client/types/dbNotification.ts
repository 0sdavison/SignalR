interface Todo {
  Id: number;
  Name: string;
  IsComplete: boolean;
}

export interface DbNotification {
  table: "Todos";
  action: "INSERT" | "UPDATE" | "DELETE";
  data: Todo;
}
