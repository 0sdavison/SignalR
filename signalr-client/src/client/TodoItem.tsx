import React, { createContext, useState } from "react";

export interface TodoItemProps {
  id: number;
  name: string;
  isCompleted: boolean;
  handleClick: (id: number, name: string, isCompleted: boolean) => void;
}
const TodoItem: React.FunctionComponent<Readonly<TodoItemProps>> = ({
  id,
  name,
  isCompleted,
  handleClick,
}) => {
  return (
    <div
      className="item-box"
      onClick={() => handleClick(id, name, isCompleted)}
    >
      <h4 className="itemheader">
        {id}. {name}
      </h4>
      <p className="donebox">
        Completed:{" "}
        {isCompleted ? <p className="yes">Yes</p> : <p className="no">No</p>}
      </p>
    </div>
  );
};

export default TodoItem;
