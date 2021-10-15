import logo from './logo.svg';
import './App.css';
import ToDoList from "./To-DoList";
import React, {useState} from 'react';



function App(props) {
    const [data, setData] = useState(props.data)
    function setField(id, field, value) {
        if (field === 'task' && (value == "" || value != null)) {
            const newData = data.filter(e => e.id != id)
            setData(newData)
            return
        }
        const newData = data.map(e => e.id === id? {...e, [field]: value} : e)
        setData(newData)
    }
    function addItem(newItem) {
        setData([...data, newItem]);
    }
    function onDelete(remainingList) {
        setData(remainingList);
    }
  return (
      <ToDoList list={data} onContentChange={setField} onNewItemAdded={addItem} onDeleteItem={onDelete}></ToDoList>
  );
}

export default App;


// focus in list when adding item
// slowly move down when checked

// for design.md
// talk about new design changes (label not clickable)
// scrolling vertically and horizontally,  (wrapping)
// when buttons are usable (grey out when not) (all 3 buttons)
// added an alert when deleting (talk about the package )
// cannot enter a null item
// enter / return in keyboard works
// delete html files




