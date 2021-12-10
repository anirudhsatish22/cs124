import Task from './Task';
import swal from 'sweetalert';
import React, {useEffect, useState} from 'react';
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import firebase from "firebase/compat";
import {useCollection} from "react-firebase-hooks/firestore";
import Select from 'react-select'
import useComponentVisible from "./test"

const firebaseConfig = {
    apiKey: "AIzaSyAMsDbORWI7OtcnI4VjQnY6xEE6XGjZPf0",
    authDomain: "to-do-list-78c30.firebaseapp.com",
    projectId: "to-do-list-78c30",
    storageBucket: "to-do-list-78c30.appspot.com",
    messagingSenderId: "466185835646",
    appId: "1:466185835646:web:dbe8a4413a6cad9f3f742f",
    measurementId: "G-3Q5LDPJYK6"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const ourCollection = "Lists";
// const DropdownInput = require("react-dropdown-input");
function ToDoList(props) {
    const [value, setValue] = useState(null);
    const [priority, setPriority] = useState(1);
    const [showCompleted, setShowCompleted] = useState(true);
    const [showPop, setShowPop] = useState(false)
    const { ref, isComponentVisible } = useComponentVisible(true);
    const dict = {'task': 'Name', 'priority': 'Priority', 'created':'Date Created', 'Sort By:':'Sort By:'};
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]

    const getSharedQuery = db.collection(ourCollection).doc(props.listId);
    const [getSharedValue, getSharedLoading, getSharedError] = useCollection(getSharedQuery);
    // console.log('getSharedValue', getSharedValue.data())
    function toggleModal() {
        setShowPop(!showPop)
    }

    function handleOk(listToShare) {
        console.log("list to share", listToShare)
        props.shareWith(listToShare.map(item => item.value), props.listId)
        toggleModal()
    }

    // let listSharedWith = props.listSharedWith.data().sharedWith((email) => {
    //     return {"value":email, "label":email}
    // })
    function Alert(props) {
        const [listToShare, setListToShare] = useState(null)
        return (
        <div className={"backdrop"}>
           <div className="modal">
               <h4>Select the users you want to share with</h4>
               <Select class="modal-content" id="share-dropdown" defaultValue={listToShare} isMulti blurInputOnSelect={false} options={emailList} onChange={e => setListToShare(e)}/>
                <div className="alert-buttons">
                    <button className="show-buttons pop-up-buttons" type={"button"}
                            onClick={props.onClose}>
                        Cancel
                    </button>

                    <button onClick={() => props.onDone(listToShare)} className="show-buttons pop-up-buttons" id="pop-up-done">
                        Done
                    </button>
                </div>
            </div>
        </div>)

    }

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

    // console.log(firebase.firestore.FieldValue.serverTimestamp())
    // // created: firebase.fitrestore.FieldValue.serverTimestamp()
    // // firebase.firestore.FieldValue.serverTiem
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
    console.log("THis is the updated list", updatedList)
    let emailList = props.usersList.map((email) => {
        return {"value":email, "label":email}
    })
    console.log("Email List", emailList)
    return (
        <>
            <span className='headerClass' id="header-one">
            <h1 className="top-title">{props.listName}</h1>
                {showPop &&
                    <Alert onClose={toggleModal} onDone={handleOk}>
                    </Alert>
                }
            </span>
            <span className='headerClass' id="header-two">
                <span id='sort-items'>
                    <button aria-label="Go back to the List of all Lists" id="back-button" className="show-buttons" onClick={props.goBack}>←</button>
                        {/*defaultValue='Date Created' value={dict[props.filterValue]}*/}
                        <select aria-label="Click this button to sort list items by a certain criterion"  id="sort-button" value={dict[props.filterValue]} class={updatedList.length != 0  ? "show-buttons" : "grey-buttons"} onChange={(e) => {
                        props.filterBy(e.target.value.toLowerCase())
                    }}>
                        <option  disabled>Sort By:</option>
                        <option aria-label="Sort By Creation Date">Date Created</option>
                        <option aria-label="Sort By Task Priority">Priority</option>
                        <option aria-label="Sort Lexicographically by Task Name">Name</option>
                    </select>
                    <button id="share-button" className="show-buttons" onClick={toggleModal}>Share List</button>
                    <button  onClick={props.logOut} className="show-buttons log-out-buttons">Log out</button>

                </span>
            </span>





            <div id="container">

                <div id='enter-item-container' className="enter-item">
                    <input aria-label="Enter the name of your new Task" type="text" value={value} id="input-text" onKeyDown={(e) => e.code === "Enter" ? enterB() : null} onChange={ (e) => setValue(e.target.value)} placeholder="Add a task..."/>
                    <select aria-label="Set Task Priority" id="priority-button" onChange={(e)=> setPriority(parseInt(e.target.value))} defaultValue='Priority:' class={ value !== "" && value !== null ? "show-buttons" : "grey-buttons"}>
                            <option selected disabled>Priority:</option>
                            <option aria-label="Set Task Priority to 1">1</option>
                            <option aria-label="Set Task Priority to 2">2</option>
                            <option aria-label="Set Task Priority to 3">3</option>
                    </select>
                    <button aria-label="Click this button to add your task to the list." className={value !== "" && value !== null ? "show-buttons" : "grey-buttons"} onClick={enterB} id="enter-button">+</button>

                </div>


                    {/*<div class="modal">*/}
                    {/*    <Select class="modal-content" id="share-dropdown" isMulti options={emailList}/>*/}
                    {/*</div>*/}


                <div class="ListItems">
                    {console.log(props.usersList)}

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
                <button aria-label={showCompleted ? "Click this button to hide completed tasks" : "Click this button to show completed tasks"} class={numCompleted > 0 ? "show-buttons" : "grey-buttons"} id="hide-completed-button" onClick={() => setShowCompleted(!showCompleted)}>{showCompleted ? "Hide Completed" : "Show Completed"}</button>
                <button aria-label="Click this button to Delete Completed Tasks" class={numCompleted > 0 && showCompleted ? "show-buttons" : "grey-buttons"} id="delete-button" onClick={onDelete}>Delete Completed</button>
            </div>
        </>
);
}


export default ToDoList;

