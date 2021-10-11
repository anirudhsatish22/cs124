import React, {useState} from 'react';
function Task(props) {
    const [completed, setCompleted] = useState(props.completed);
    return (<li key ={props.key}>
        <label>
            <input type="checkbox" onChange={() => {setCompleted(!completed); props.onTaskCompleted(props.id, !completed)}} checked = {false} class={completed ? "checked" : "unchecked"}/>
                <span class={completed ? "checked-text" : "unchecked-text"}>{props.task}</span>
        </label>
    </li>);


}

// {
export default Task;