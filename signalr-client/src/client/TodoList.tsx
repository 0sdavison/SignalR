import React from "react";
import TodoItem from "./TodoItem";
import { Todo } from "./types/todo";

export interface TodoListProps {
  todos: Todo[];
  handleItemClick: (id: number, name: string, isCompleted: boolean) => void;
}
const TodoList: React.FunctionComponent<Readonly<TodoListProps>> = ({
  todos,
  handleItemClick,
}) => {
  return (
    <div className="todoList">
      {todos.map((todo) => (
        <div className="todoitem" key={todo.id}>
          <TodoItem
            id={todo.id}
            name={todo.name}
            isCompleted={todo.isComplete}
            handleClick={handleItemClick}
          />
        </div>
      ))}
    </div>
  );
};

export default TodoList;
