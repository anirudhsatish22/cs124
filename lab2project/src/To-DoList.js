import Task from './Task';
import swal from 'sweetalert';

import React, {useEffect, useState} from 'react';
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";

// let myLength = generateUniqueID()
function ToDoList(props) {
    const [value, setValue] = useState(null);
    const [showCompleted, setShowCompleted] = useState(true);
    const [numCompleted, setNumCompleted] = useState(0);

    function enterB() {
        if (value !== null && value !== "") {
            let newItem = {
                id: generateUniqueID(),
                task: value,
                completed: false
            };
            props.onNewItemAdded(newItem);
            setValue("")
        }
    }
    function renderList(unSortedList) {
        let checkedArray = unSortedList.filter(x => x.completed)
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
                    let remainingList = updatedList.filter(a => a.completed === true);
                    props.onDeleteItem(remainingList);
                    setNumCompleted(0)

                } else {
                    return;
                }
            });
    }



    let updatedList = renderList(props.list)

    return (
        <>
            <h1 id="top-title">To-Do List</h1>
            <div id="container">

                <div id="enter-item">
                    <input type="text" value={value} id="input-text" onKeyDown={(e) => e.code === "Enter" ? enterB() : null} onChange={ (e) => setValue(e.target.value)} placeholder="Add a task..."/>
                    <span id="enter-span">
                    <button class={ value !== "" && value !== null ? "show-buttons" : "grey-buttons"}onClick={enterB} id="enter-button">+</button>
                    </span>
                </div>

                <div class="ListItems">
                    <ul id="list">
                        {showCompleted ? updatedList.map(a => <Task
                            onTaskCompleted={ (selectedId, field, value) =>
                            props.onContentChange(selectedId, field, value) ?  setNumCompleted(numCompleted - 1): null
                            }
                            key = {a.id}
                            displayButtons ={(whetherCompleted)=> {whetherCompleted ? setNumCompleted(numCompleted + 1) : setNumCompleted(numCompleted-1)}}
                            {...a}
                        />) : updatedList.filter(a => a.completed === false).map(a => <Task
                            onTaskCompleted={ (selectedId, field, value) =>
                            props.onContentChange(selectedId, field, value) ?  setNumCompleted(numCompleted - 1) : null
                            }
                            key = {a.id}
                            displayButtons ={(whetherCompleted)=> whetherCompleted ? setNumCompleted(numCompleted + 1) : setNumCompleted(numCompleted-1)}
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

