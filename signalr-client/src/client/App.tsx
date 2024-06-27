import React from "react";
import { useState } from "react";
import Button from "./Button";
import SignalRProvider from "./SignalRContext";
import TodoList from "./TodoList";
import TodoStore from "./TodoStore";
import * as api from "./services/api";
import "../../public/style.css";

const App: React.FC = () => {
  const [id, setID] = useState(0);
  const [name, setName] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  const HandleChangeID = (e) => {
    setID(parseInt(e.target.value));
  };
  const HandleChangeName = (e) => {
    setName(e.target.value);
  };
  const HandleChangeCompleted = (e) => {
    setIsCompleted(e.target.checked);
  };

  return (
    <div className="mainflex fullheight">
      <SignalRProvider>
        <div className="flexcol">
          <div className="header">
            <h1 className="headertitle">
              SignalR To-Do List Grav Hack 2024
            </h1>
            <p className="names">By: Seth, Elizabeth, and Caleb</p>
          </div>
          <div className="bottomhalf">
            <TodoStore>{(todos) => <TodoList todos={todos} />}</TodoStore>
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
                      onChange={HandleChangeID}
                    />
                  </div>
                  <div className="textflex">
                    <p>Task</p>
                    <input
                      type="input"
                      name="Name"
                      className="textbox input"
                      onChange={HandleChangeName}
                    />
                  </div>
                  <div className="completedflex">
                    <p>Completed:</p>
                    <input
                      type="checkbox"
                      name="Completed"
                      onChange={HandleChangeCompleted}
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
