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
  return (
      <ToDoList list={data} onContentChange={setField} onNewItemAdded={addItem}></ToDoList>

    //   <ToDoList list={props.data}></ToDoList>
  );
}

export default App;



// css is still being weird
// when item is checked, move to very bottom of the list, that is it becomes the bottom most element.
// edit item in list
// delete and hide buttons and implementations
// round buttons to rounded squares? maybe?
// formatting long text? think about wrapping and indent or smt

