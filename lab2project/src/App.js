import logo from './logo.svg';
import './App.css';
import ToDoList from "./To-DoList";
import React, {useState} from 'react';



function App(props) {
    const [data, setData] = useState(props.data)
    function setField(id, field, value) {
        console.log("old data", data)
        console.log("id:", id)
        console.log("field:", field)
        console.log("value:", value)

        const newData = data.map(e => e.id === id? {...e, [field]: value} : e)
        setData(newData)
        console.log("new data:", newData)
    }
    function addItem(newItem) {
        setData([...data, newItem]);
    }
    function onDelete(remainingList) {
        setData(remainingList);
        console.log("newData:", data)
    }
  return (
      <ToDoList list={data} onContentChange={setField} onNewItemAdded={addItem} onDeleteItem={onDelete}></ToDoList>

    //   <ToDoList list={props.data}></ToDoList>
  );
}

export default App;



// css is still being weird
// edit item in list
// delete button and implementations
//alert... chrome one? or fancy one

// formatting long text? think about wrapping and indent or smt

