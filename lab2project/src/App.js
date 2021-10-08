import logo from './logo.svg';
import './App.css';
import ToDoList from "./To-DoList";
import React, {useState} from 'react';



function App(props) {
    const [data, setData] = useState(props.data)
    function setField(id, field, value) {
        let newData = data;
        newData.map(e => e.id === id? e[field] = value : e)
        setData(newData)
        console.log(newData)
    }
  return (
    <div className="App">
      <ToDoList list={data} onContentChange={(id, field, value) => setField(id,field,value)}></ToDoList>
    </div>
    //   <ToDoList list={props.data}></ToDoList>
  );
}

export default App;

//checkbox doing weird stuff
// css is still being weird
// assume we have ID:, when we hit +(enter) item is added to list, we get some ID,
// when item is checked, move to very bottom of the list, that is it becomes the bottom most element.


