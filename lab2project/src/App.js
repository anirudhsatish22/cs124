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
            if (data.filter(e => e.id === id)[0].completed === true) {
                return true
            }
            return false
        }
        const newData = data.map(e => e.id === id? {...e, [field]: value} : e)
        setData(newData)
        return false
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
