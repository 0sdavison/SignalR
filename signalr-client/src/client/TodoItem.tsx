import React, { createContext, useState } from "react";

export interface TodoItemProps {
    id: number,
    name: string,
    isCompleted: boolean
}
const TodoItem: React.FunctionComponent<Readonly<TodoItemProps>> = ({
    id, name, isCompleted
}) => {
    return <div className="item-box">
        <h1 className="">{name}</h1>
        <p>{id}</p>
        <p>Done: {isCompleted}</p>
    </div>
}

export default TodoItem;