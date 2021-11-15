import React, {useState} from 'react';
function List(props) {
    const [editContent, setEditContent] = useState(true);
    const [listValue, setListValue] = useState(props.name)

    function editTimeout() {
        setEditContent(false);
        props.onListChange(props.id, 'name', listValue);
        setTimeout(() => {setEditContent(true)},50)
    }
    return (
        <li key={props.id}>
        <span className="taskItem">
            <label suppressContentEditableWarning={true} contentEditable={editContent} onKeyDown={(k)=> k.code === 'Enter' ? editTimeout() : null} onInput={(e) => setListValue(e.currentTarget.textContent)}>{props.name}</label>
            <button onClick={() => props.onGo(props.id, props.name)}>Go</button>
        </span>
        </li>
    );

}

{/*<label onChange={() => {props.onTaskCompleted(props.id, 'completed', !completed); props.displayButtons(!completed)}} checked = {false} class={completed ? "checked" : "unchecked"}/>*/}
export default List;
