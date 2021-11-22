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
            <input type="checkbox" onChange={() => {props.onTaskCompleted(props.id, 'completed', !completed); props.displayButtons(!completed)}} checked = {false} class={completed ? "checked" : "unchecked"}/>
                    <span suppressContentEditableWarning={true} contentEditable={editContent} onBlur={() => editTimeout()} onKeyDown={(k)=> k.code === 'Enter' ? editTimeout() : null} class={completed ? "checked-text" : "unchecked-text"} onInput={(e) =>  setTaskValue(e.currentTarget.textContent)}>{props.task}</span>
        </label>
        </span>
        <select className="taskPriority" onChange={(e) => props.onTaskCompleted(props.id, 'priority', parseInt(e.target.value))} value={props.priority}>
            <option>1</option>
            <option>2</option>
            <option>3</option>
        </select>
    </li>
    );

}

export default Task;