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
        <li key ={props.key}>
        <span className="taskItem">
            {/*<label onChange={() => {props.onTaskCompleted(props.id, 'completed', !completed); props.displayButtons(!completed)}} checked = {false} class={completed ? "checked" : "unchecked"}/>*/}
                    <label suppressContentEditableWarning={true} contentEditable={editContent} onChange={props.onListChange(props.id, 'name', listValue)} onKeyDown={(k)=> k.code === 'Enter' ? editTimeout() : null} onInput={(e) => setListValue(e.currentTarget.textContent)}>{props.name}</label>
        </span>
        </li>
    );

}

export default List;
