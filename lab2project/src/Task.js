import React, {useState} from 'react';
function Task(props) {
    const [completed, setCompleted] = useState(props.completed);
    const [editContent, setEditContent] = useState(true);
    const [taskValue, setTaskValue] = useState(props.task)

    function editTimeout() {
        setEditContent(false);
        props.onTaskCompleted(props.id, 'task', taskValue);
        setTimeout(() => {setEditContent(true)},50)
    }
    return (
    <li key ={props.key}>
        <label class="test">
            <input type="checkbox" onChange={() => {setCompleted(!completed); props.onTaskCompleted(props.id, 'completed', !completed); props.displayButtons(!completed)}} checked = {false} class={completed ? "checked" : "unchecked"}/>
                    <span suppressContentEditableWarning={true} contentEditable={editContent} onKeyDown={(k)=> k.code === 'Enter' ? editTimeout() : null} class={completed ? "checked-text" : "unchecked-text"} onInput={(e) => setTaskValue(e.currentTarget.textContent)}>{props.task}</span>
                             {/*onChange={(e) => setPriority(e.target.value)} defaultValue={priority}*/}
        </label>
        <span className="taskPriorityContainer">
        <select className="taskPriority" onChange={(e) => props.onTaskCompleted(props.id, 'priority', e.target.value)} defaultValue={props.priority}>
            <option>Now</option>
            <option>Today</option>
            <option>Later</option>
        </select>
        </span>
    </li>
    );

}

// {
export default Task;