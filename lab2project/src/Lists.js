
import App from './App';
import './App.css';
import ToDoList from "./To-DoList";
import List from './List';
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import React, {useState} from 'react';


function Lists(props) {

    const [value, setValue] = useState(null);

    function enterB() {
        if (value !== null && value !== "") {
            let newItem = {
                id: generateUniqueID(),
                name: value
                // created: firebase.database.ServerValue.TIMESTAMP
            };
            props.onNewItemAdded(newItem);
            setValue("")
        }
    }

    return (
        <div>
            <h1 id="top-title">Lists</h1>
            <div id="container">
                <div id="enter-item">
                    <input type="text" id="input-text" value={value} onKeyDown={(e) => e.code === "Enter" ? enterB() : null} onChange={ (e) => setValue(e.target.value)} placeholder="Create a list..."/>
                    <span id="enter-span">
                        <span id='enter-button-container'>
                        <button className={value !== "" && value !== null ? "show-buttons" : "grey-buttons"}  onClick={enterB} id="enter-button">+</button>
                        </span>
                    </span>
                </div>
                <div class="ListItems">
                    <ul id="list">{
                        props.list.map(a => <List onListChange={props.onContentChange}{...a}/>)
                    }
                    </ul>
               </div>
            </div>
        </div>

    )
}

// onTaskCompleted={ (selectedId, field, value) =>
//     props.onContentChange(selectedId, field, value) ?  numCompleted--  : null
// }
// displayButtons ={(whetherCompleted)=> {whetherCompleted ? numCompleted++ : numCompleted--}}

export default Lists;












