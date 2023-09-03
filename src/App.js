import "./App.css";
import React, { useState } from "react";
import { ReactComponent as Delete } from "./components/assets/delete.svg";
import { ReactComponent as Revert } from "./components/assets/revert.svg";
import { ReactComponent as Tick } from "./components/assets/tick-green.svg";
import { ReactComponent as Plus } from "./components/assets/plus.svg";

function App() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");
  const [nextId, setNextId] = useState(1);

  // to make the item completed
  const completeItem = (id) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          return { ...item, completed: !item.completed };
        }
        return item;
      })
    );
  };

  //to remove the item from the list
  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  //render befor compete and after complete
  const renderItem = (completed) => {
    return items
      .filter((item) => item.completed === completed)
      .map((item) => {
        return (
          <li key={item.id} className={item.completed ? "completed" : ""}>
            <div className="mainDiv1">
              <button
                className={`Complete ${item.completed ? "completed" : ""}`}
                onClick={() => completeItem(item.id)}
              >
                {item.completed ? <Tick /> : null}
              </button>
              {item.id}: {item.text}
            </div>
            <div>
              {completed && (
                <button
                  className={`revert ${item.completed ? "" : "completed"}`}
                  onClick={() => completeItem(item.id)}
                >
                  <Revert />
                </button>
              )}
              <button
                onClick={() => removeItem(item.id)}
                className="Deletebutton"
              >
                <Delete />
              </button>
            </div>
          </li>
        );
      });
  };

  //for adding from input
  const updateItem = () => {
    let new_item = {
      id: nextId,
      text: input,
      completed: false,
    };
    setItems([...items, new_item]);
    setInput("");
    setNextId(nextId + 1);
  };

  //main return
  return (
    <div className="container">
      <div className="wrapper">
        <h1 className="mainText">ToDo List</h1>
        <div className="content">
          <h3>Things to be complete</h3>
          <ul>{renderItem(false)}</ul>
          <div className="inputIn">
            <Plus />
            <input
              placeholder="Add your ToDo Things here"
              className="inputList"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

            <button className="addButton" onClick={updateItem}>
              Add New
            </button>
          </div>
          <h3>Completed things</h3>
          <ul>{renderItem(true)}</ul>
        </div>
      </div>
    </div>
  );
}

export default App;
