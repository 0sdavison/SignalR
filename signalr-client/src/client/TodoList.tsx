import React, { createContext, useState } from "react";
import TodoItem from "./TodoItem";
import { Todo } from "./types/todo";

export interface TodoListProps {
    todos: Todo[]
}
const TodoList: React.FunctionComponent<Readonly<TodoListProps>> = ({
    todos,
}) => {

    return <div>
        {todos.map(todo => <div>
            <TodoItem key={todo.id} id={todo.id} name={todo.name} isCompleted={todo.isComplete} />
        </div>)}
    </div>
}

export default TodoList;