import React, {useState} from 'react';
function Task(props) {
    const completed = props.completed;
    const [editContent, setEditContent] = useState(true);
    const [taskValue, setTaskValue] = useState(props.task)

    function editTimeout() {
        setEditContent(false);
        props.onTaskCompleted(props.id, 'task', taskValue);
        setTimeout(() => {setEditContent(true)},50)
    }
    return (
    <li key ={props.key}>
        <span className="taskItem">
        <label>
            <input aria-label={completed ? "Click this Checkbox to mark this task as not completed" : "Click this Checkbox to mark this task as completed"} type="checkbox" onChange={() => {props.onTaskCompleted(props.id, 'completed', !completed); props.displayButtons(!completed)}} checked = {false} class={completed ? "checked" : "unchecked"}/>
                    <span aria-label="Start typing to edit the name of the corresponding task." suppressContentEditableWarning={true} contentEditable={editContent} onBlur={() => editTimeout()} onKeyDown={(k)=> k.code === 'Enter' ? editTimeout() : null} class={completed ? "checked-text" : "unchecked-text"} onInput={(e) =>  setTaskValue(e.currentTarget.textContent)}>{props.task}</span>
        </label>
        </span>
        <select aria-label="Set Task Priority" className="taskPriority" onChange={(e) => props.onTaskCompleted(props.id, 'priority', parseInt(e.target.value))} value={props.priority}>
            <option aria-label="Set Task Priority to 1">1</option>
            <option aria-label="Set Task Priority to 2">2</option>
            <option aria-label="Set Task Priority to 3">3</option>
        </select>
    </li>
    );

}

export default Task;