import React from "react";
import Button from "./Button";
import SignalRProvider from "./SignalRContext";
import TodoList from "./TodoList";
import TodoStore from "./TodoStore";
import * as api from "./services/api";
import "../../public/style.css";

const App: React.FC = () => {
  return (
    <div className="mainflex fullheight">
      <SignalRProvider>
        <TodoStore>{(todos) => <TodoList todos={todos} />}</TodoStore>
        <div className="rightside">
          <div className="inputButtonContainer">
            <div className="inputflex fontwhite">
              <div className="textflex">
                <p>
                  ID
                </p>
                <input type="number" name="ID" className="textbox input" min="1" max="10" />
              </div>
              <div className="textflex">
                <p>
                  Task
                </p>
                <input type="input" name="Name" className="textbox input" />
              </div>
              <div className="completedflex">
                <p>
                  Completed?
                </p>
                <input type="checkbox" name="Completed" />
              </div>
            </div>
            <div className="buttonsbox">
              <div className="AddItem fitheight">
                <Button
                  onClick={() => {
                    return api.createTodo({ id: 2, name: "bar", isComplete: false });
                  }}
                >
                  Add Item
                </Button>
              </div>
              <div className="ModifyItem fitheight">
                <Button
                  onClick={() => { }}
                >
                  Modify Item
                </Button>
              </div>
              <div className="RemoveItem fitheight">
                <Button
                  onClick={() => { }}
                >
                  Delete Item
                </Button>
              </div>
            </div>
          </div>
        </div>
      </SignalRProvider >
    </div >
  );
};

export default App;
