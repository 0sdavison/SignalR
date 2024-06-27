import React, { useState } from "react";
import "../../public/style.css";
import Button from "./Button";
import SignalRProvider from "./SignalRContext";
import TodoList from "./TodoList";
import TodoStore from "./TodoStore";
import * as api from "./services/api";
import { Todo } from "./types/todo";

const App: React.FC = () => {
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  const handleItemClick = (id: number, name: string, isCompleted: boolean) => {
    setId(id);
    setName(name);
    setIsCompleted(isCompleted);
  };

  const handleChangeID = (e) => {
    setId(parseInt(e.target.value));
  };
  const handleChangeName = (e) => {
    setName(e.target.value);
  };
  const handleChangeCompleted = (e) => {
    setIsCompleted(e.target.checked);
  };

  return (
    <div className="mainflex fullheight">
      <SignalRProvider>
        <div className="flexcol">
          <h1 className="header">SignalR To-Do List Grav Hack 2024</h1>
          <div className="bottomhalf">
            <TodoStore>
              {(todos) => (
                <TodoList todos={todos} handleItemClick={handleItemClick} />
              )}
            </TodoStore>
            <div className="rightside">
              <div className="inputButtonContainer fullwidth">
                <h3 className="console">Console</h3>
                <div className="inputflex fontwhite">
                  <div className="textflex">
                    <p>ID</p>
                    <input
                      type="number"
                      name="ID"
                      className="textbox input"
                      min="1"
                      max="10"
                      value={id}
                      onChange={handleChangeID}
                    />
                  </div>
                  <div className="textflex">
                    <p>Task</p>
                    <input
                      type="input"
                      name="Name"
                      className="textbox input"
                      value={name}
                      onChange={handleChangeName}
                    />
                  </div>
                  <div className="completedflex">
                    <p>Completed:</p>
                    <input
                      type="checkbox"
                      name="Completed"
                      checked={isCompleted}
                      onChange={handleChangeCompleted}
                    />
                  </div >
                </div >
                <div className="buttonsbox">
                  <div className="AddItem fitheight">
                    <Button
                      onClick={() => {
                        return api.createTodo({
                          id: id,
                          name: name,
                          isComplete: isCompleted,
                        });
                      }}
                    >
                      Add Item
                    </Button>
                  </div>
                  <div className="ModifyItem fitheight">
                    <Button
                      onClick={() => {
                        return api.updateTodo({
                          id: id,
                          name: name,
                          isComplete: isCompleted,
                        });
                      }}
                    >
                      Modify Item by ID
                    </Button>
                  </div>
                  <div className="RemoveItem fitheight">
                    <Button
                      onClick={() => {
                        return api.deleteTodo(id);
                      }}
                    >
                      Delete Item by ID
                    </Button>
                  </div>
                </div>
              </div >
            </div >
          </div >
        </div >
      </SignalRProvider >
    </div >
  );
};

export default App;
