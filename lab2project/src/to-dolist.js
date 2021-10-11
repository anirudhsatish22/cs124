import Task from './Task';

import React, {useEffect, useState} from 'react';

function ToDoList(props) {
    const [value, setValue] = useState(null);

    function enterB() {
        let newItem = {
            id: (props.list.length + 1).toString(),
            task: value,
            completed: false
        };
        props.onNewItemAdded(newItem);
        document.getElementById("input-text").value = null;
    }
    function renderList(unSortedList) {
        //, id, oldCheckedArray, oldUncheckedArray)
        // let changedElement = unSortedList.filter(x => x.completed && id == x.id)
        // let checkedArray = oldCheckedArray
        // let uncheckedArray = oldUncheckedArray
        // if (changedElement)  {
        //     checkedArray = [...oldCheckedArray, changedElement]
        //     uncheckedArray = unSortedList.filter(x => !x.completed)
        // }
        // else {
        let checkedArray = unSortedList.filter(x => x.completed)
            // console.log("checkedarray:", checkedArray)
        let uncheckedArray = unSortedList.filter(x => !x.completed)
            // console.log("uncheckedarray:", uncheckedArray)
        //
        // }
        return [...uncheckedArray, ...checkedArray]
    }



    let updatedList = renderList(props.list)
    let listOfIds = updatedList.map(e => e.id)
    console.log("listofID: ", listOfIds)
    // console.log(elementById(1, updatedList))
    return (
        <>
            <h1 id="top-title">To-Do List</h1>
            <div id="container">

                <div id="enter-item">
                    <input type="text" id="input-text" onKeyDown={(e) => e.code === "Enter" ? enterB() : null} onChange={ (e) => setValue(e.target.value)} placeholder="Add a task..."/>
                    <span id="enter-span">
                    <button onClick={enterB} id="enter-button">+</button>
                    </span>
                </div>

                <div class="ListItems">
                    <ul id="list">
                        {updatedList.map(a => <Task
                            onTaskCompleted={ (selectedId, value) =>
                                props.onContentChange(selectedId, 'completed', value)
                            }
                            key = {a.id}
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
                <button id="hide-completed-button">Hide Completed</button>
                <button id="delete-button">Delete Completed</button>
            </div>
        </>
);
}



export default ToDoList;

