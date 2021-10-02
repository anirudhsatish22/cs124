import Task from './Task';

import React, {useEffect, useState} from 'react';

function ToDoList(props) {
    return (
        <div>
            <h1 id="top-title">To-Do List</h1>
            <div id="container">

                <div id="enter-item">
                    <input type="text" id="input-text" placeholder="Add a task..."/>
                    <span id="enter-span">
                    <button onClick="enterB()" id="enter-button">+</button>
                    </span>
                </div>

                <div class="ListItems">
                    <ul id="list">
                        {props.list.map(a => <Task
                            {...a}
                        />)}
                    </ul>
                </div>
                {/*{console.log(props.list)}*/}
            </div>
        </div>
);
}



export default ToDoList;

