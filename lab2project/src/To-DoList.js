import Task from './Task';
import swal from 'sweetalert';

import React, {useEffect, useState} from 'react';
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import firebase from "firebase/compat";


// let myLength = generateUniqueID()
function ToDoList(props) {
    const [value, setValue] = useState(null);
    const [priority, setPriority] = useState(1);
    const [showCompleted, setShowCompleted] = useState(true);
    const [dummyState, setDummyState] = useState(true);
    // const [numCompleted, setNumCompleted] = useState(0);
    const dict = {'task': 'Name', 'priority': 'Priority', 'created':'Creation Date'};

    function enterB() {
        if (value !== null && value !== "") {
            let newItem = {
                id: generateUniqueID(),
                task: value,
                completed: false,
                priority: priority,
                created: firebase.database.ServerValue.TIMESTAMP
            };
            props.onNewItemAdded(newItem);
            setValue("")
        }
    }
    let numCompleted = 0
    function renderList(unSortedList) {
        let checkedArray = unSortedList.filter(x => x.completed)
        numCompleted = checkedArray.length
        let uncheckedArray = unSortedList.filter(x => !x.completed)
        return [...uncheckedArray, ...checkedArray]
    }

    function onDelete(){
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover completed tasks!",
            icon: "warning",
            buttons: ["No", "Yes"],
            dangerMode: true,
        })
            .then((okToDelete) => {
                if (okToDelete) {
                    let listOfIds = updatedList.filter(a => a.completed === true).map(a => a.id);
                    props.onDeleteItem(listOfIds);
                    numCompleted = 0

                } else {
                    return;
                }
            });
    }



    let updatedList = renderList(props.list)

    return (
        <>
            <span className='headerClass'>
            <h1 id="top-title">To-Do List</h1>
                <span id='sort-button'>
                <select  defaultValue={dict[props.filterValue]} onChange={(e) => {
                    props.filterBy(e.target.value.toLowerCase())
                    // setDummyState(!dummyState)
                }}>
                    <option>Priority</option>
                    <option>Name</option>
                    <option>Creation Date</option>
                </select>
                </span>
            </span>
            <div id="container">

                <div id="enter-item">
                    <input type="text" value={value} id="input-text" onKeyDown={(e) => e.code === "Enter" ? enterB() : null} onChange={ (e) => setValue(e.target.value)} placeholder="Add a task..."/>
                    <span id="enter-span">
                    <span id="priority-container">
                    <select id="priority-button" onChange={(e)=> setPriority(parseInt(e.target.value))} defaultValue={priority} class={ value !== "" && value !== null ? "show-buttons" : "grey-buttons"}>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                    </select>
                    </span>
                    <button class={ value !== "" && value !== null ? "show-buttons" : "grey-buttons"}onClick={enterB} id="enter-button">+</button>
                    </span>
                </div>

                <div class="ListItems">
                    <ul id="list">
                        {showCompleted ? updatedList.map(a => <Task
                            onTaskCompleted={ (selectedId, field, value) =>
                            props.onContentChange(selectedId, field, value) ?  numCompleted--  : null
                            }
                            key = {a.id}
                            displayButtons ={(whetherCompleted)=> {whetherCompleted ? numCompleted++ : numCompleted--}}
                            {...a}
                        />) : updatedList.filter(a => a.completed === false).map(a => <Task
                            onTaskCompleted={ (selectedId, field, value) =>
                            props.onContentChange(selectedId, field, value) ?  numCompleted-- : null
                            }
                            key = {a.id}
                            displayButtons ={(whetherCompleted)=> whetherCompleted ? numCompleted++ : numCompleted--}
                            {...a}
                        />)}
                        {console.log(numCompleted)}

                    </ul>
                </div>
                <button class={numCompleted > 0 ? "show-buttons" : "grey-buttons"} id="hide-completed-button" onClick={() => setShowCompleted(!showCompleted)}>{showCompleted ? "Hide Completed" : "Show Completed"}</button>
                <button class={numCompleted > 0 && showCompleted ? "show-buttons" : "grey-buttons"} id="delete-button" onClick={onDelete}>Delete Completed</button>
            </div>
        </>
);
}


export default ToDoList;

