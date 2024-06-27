import React, { createContext, useState } from "react";
import TodoItem from "./TodoItem";
import { Todo } from "./types/todo";

export interface TodoListProps {
    todos: Todo[]
}
const TodoList: React.FunctionComponent<Readonly<TodoListProps>> = ({
    todos,
}) => {

    return <div className="todoList">
        {todos.map(todo => <div className="todoitem">
            <TodoItem key={todo.id} id={todo.id} name={todo.name} isCompleted={todo.isComplete} />
        </div>)}
    </div>
}

export default TodoList;