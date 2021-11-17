import Task from './Task';
import swal from 'sweetalert';
import React, {useEffect, useState} from 'react';
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import firebase from "firebase/compat";


function ToDoList(props) {
    const [value, setValue] = useState(null);
    const [priority, setPriority] = useState(1);
    const [showCompleted, setShowCompleted] = useState(true);
    const dict = {'task': 'Name', 'priority': 'Priority', 'created':'Date Created', 'Sort By:':'Sort By:'};

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
            <h1 className="top-title">{props.listName}</h1>
            </span>
            <span className='headerClass'>
                <span id='sort-items'>
                <button id="back-button" className="show-buttons" onClick={props.goBack}>←</button>
                <select  id="sort-button" defaultValue={dict[props.filterValue]} class={updatedList.length != 0  ? "show-buttons" : "grey-buttons"} onChange={(e) => {
                    props.filterBy(e.target.value.toLowerCase())
                }}>
                    <option selected disabled>Sort By:</option>
                    <option>Priority</option>
                    <option>Name</option>
                    <option>Date Created</option>
                </select>
                </span>
            </span>
            <div id="container">

                <div className="enter-item">
                    <input type="text" value={value} className="input-text" onKeyDown={(e) => e.code === "Enter" ? enterB() : null} onChange={ (e) => setValue(e.target.value)} placeholder="Add a task..."/>
                    <span className="enter-span">
                    <span id="priority-container">
                    <select id="priority-button" onChange={(e)=> setPriority(parseInt(e.target.value))} defaultValue='Priority:' class={ value !== "" && value !== null ? "show-buttons" : "grey-buttons"}>
                            <option selected disabled>Priority:</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                    </select>
                    </span>
                        <span className='enter-button-container'>
                    <button className={value !== "" && value !== null ? "show-buttons" : "grey-buttons"} onClick={enterB} id="enter-button">+</button>
                        </span>
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
                    </ul>
                </div>
                <button class={numCompleted > 0 ? "show-buttons" : "grey-buttons"} id="hide-completed-button" onClick={() => setShowCompleted(!showCompleted)}>{showCompleted ? "Hide Completed" : "Show Completed"}</button>
                <button class={numCompleted > 0 && showCompleted ? "show-buttons" : "grey-buttons"} id="delete-button" onClick={onDelete}>Delete Completed</button>
            </div>
        </>
);
}


export default ToDoList;

