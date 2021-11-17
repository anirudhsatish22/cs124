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
        <li className="listItem" key={props.id}>
        <span className="taskItem">
            <label suppressContentEditableWarning={true} contentEditable={editContent} onKeyDown={(k)=> k.code === 'Enter' ? editTimeout() : null} onInput={(e) => setListValue(e.currentTarget.textContent)}>{props.name}</label>
        </span>
            <button className="show-buttons" id="go-button" onClick={() => props.onGo(props.id, props.name)}>Go</button>
            <button className="show-buttons" id="delete-list-button" onClick={() =>props.onDelete(props.id)}>🗑</button>
        </li>
    );
}

{/*<label onChange={() => {props.onTaskCompleted(props.id, 'completed', !completed); props.displayButtons(!completed)}} checked = {false} class={completed ? "checked" : "unchecked"}/>*/}
export default List;
