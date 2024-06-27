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
        <h4 className="itemheader">{id}. {name}</h4>
        <p className="donebox">Completed: {isCompleted ? <p className="yes">Yes</p> : <p className="no">No</p>}</p>
    </div>
}

export default TodoItem;