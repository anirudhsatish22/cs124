import Task from './Task';

import React, {useEffect, useState} from 'react';
let myLength = 4;
function ToDoList(props) {
    const [value, setValue] = useState(null);
    const [showCompleted, setShowCompleted] = useState(true);
    const [numCompleted, setNumCompleted] = useState(1);

    function enterB() {
        if (value != null && value != "") {
            let newItem = {
                id: (++myLength).toString(),
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
        let remainingList = updatedList.filter(a => a.completed === false);
        props.onDeleteItem(remainingList);
    }



    let updatedList = renderList(props.list)
    console.log("numcompleted", numCompleted);

    // let listOfIds = updatedList.map(e => e.id)
    // console.log("listofID: ", listOfIds)
    return (
        <>
            <h1 id="top-title">To-Do List</h1>
            <div id="container">

                <div id="enter-item">
                    <input type="text" value={value} id="input-text" onKeyDown={(e) => e.code === "Enter" ? enterB() : null} onChange={ (e) => setValue(e.target.value)} placeholder="Add a task..."/>
                    <span id="enter-span">
                    <button onClick={enterB} id="enter-button">+</button>
                    </span>
                </div>

                <div class="ListItems">
                    <ul id="list">
                        {showCompleted ? updatedList.map(a => <Task
                            onTaskCompleted={ (selectedId, field, value) =>
                                props.onContentChange(selectedId, field, value)
                            }
                            key = {a.id}
                            displayButtons ={(whetherCompleted)=> whetherCompleted ? setNumCompleted(numCompleted + 1) : setNumCompleted(numCompleted-1)}
                            {...a}
                        />) : updatedList.filter(a => a.completed === false).map(a => <Task
                            onTaskCompleted={ (selectedId, value) =>
                                props.onContentChange(selectedId, 'completed', value)
                            }
                            key = {a.id}
                            displayButtons ={(whetherCompleted)=> whetherCompleted ? setNumCompleted(numCompleted + 1) : setNumCompleted(numCompleted-1)}
                            {...a}
                        />)}

                        {/*{listOfIds.map(a => <Task*/}
                        {/*    onTaskCompleted={ (selectedId, value) =>*/}
                        {/*        props.onContentChange(selectedId, 'completed', value)*/}
                        {/*    }*/}
                        {/*    key = {a}*/}
                        {/*    {...elementById(a, updatedList)}*/}
                        {/*/>)}*/}

                    </ul>
                </div>
                {/*{console.log(props.list)}*/}
                <button class={numCompleted > 0 ? "show-buttons" : "grey-buttons"} id="hide-completed-button" onClick={() => setShowCompleted(!showCompleted)}>{showCompleted ? "Hide Completed" : "Show Completed"}</button>
                <button class={numCompleted > 0 ? "show-buttons" : "grey-buttons"} id="delete-button" onClick={() => {onDelete(); setNumCompleted(0)}}>Delete Completed</button>
            </div>
        </>
);
}



export default ToDoList;

