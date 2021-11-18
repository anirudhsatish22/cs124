
import App from './App';
import './App.css';
import ToDoList from "./To-DoList";
import List from './List';
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import React, {useState} from 'react';
import swal from 'sweetalert';



function Lists(props) {

    const [value, setValue] = useState('');

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


    function onDelete(id){
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this List!",
            icon: "warning",
            buttons: ["No", "Yes"],
            dangerMode: true,
        })
            .then((okToDelete) => {
                if (okToDelete) {
                    props.onDeleteItem([id]);
                } else {
                    return;
                }
            });
    }
    return (
        <>
            <h1 className="top-title">Lists</h1>
            <div id="list-container">
                <div className="enter-item">
                    <input type="text" maxLength="28" id="list-input-text" value={value} onKeyDown={(e) => e.code === "Enter" ? enterB() : null} onChange={ (e) => setValue(e.target.value)} placeholder="Create a list..."/>
                    <span className="enter-span">
                        <span className='enter-button-container'>
                        <button className={value !== "" && value !== null ? "show-buttons" : "grey-buttons"}  onClick={enterB} id="enter-button">+</button>
                        </span>
                    </span>
                </div>
                <div class="ListItems" id="List-of-list-items">
                    <ul id="list">{
                        props.list.map(a => <List onGo={props.displayList} onListChange={props.onContentChange} onDelete={onDelete}{...a}/>)
                    }
                    </ul>
               </div>
            </div>
        </>

    )
}

// onTaskCompleted={ (selectedId, field, value) =>
//     props.onContentChange(selectedId, field, value) ?  numCompleted--  : null
// }
// displayButtons ={(whetherCompleted)=> {whetherCompleted ? numCompleted++ : numCompleted--}}

export default Lists;












