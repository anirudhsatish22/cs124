
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


    function deleteAllLists() {
        swal({
            title: "Delete All Lists?",
            text: "Once deleted, you will not be able to recover these Lists!",
            icon: "warning",
            buttons: ["No", "Yes"],
            dangerMode: true,
        })
            .then((okToDelete) => {
                if (okToDelete) {
                    props.list.map(list => props.onDeleteItem([list.id]));
                } else {
                    return;
                }
            });

    }

    return (
        <>
            <h1 className="top-title">Lists</h1>
            <div id="list-container">
                <div className="enter-item" id="list-enter-item">
                    <input aria-label="Enter the name of your new List" type="text" maxLength="28" id="list-input-text" value={value} onKeyDown={(e) => e.code === "Enter" ? enterB() : null} onChange={ (e) => setValue(e.target.value)} placeholder="Create a list..."/>
                    <button aria-label="Click this button to add your new List to the List of Lists." className={value !== "" && value !== null ? "show-buttons" : "grey-buttons"}  onClick={enterB} id="list-enter-button">+</button>
                    <button aria-label="Click this button to delete all the Lists that you have." className={props.list.length > 0 ? "show-buttons" : "grey-buttons"} id="delete-all-lists" onClick={deleteAllLists}>🗑</button>


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

export default Lists;












