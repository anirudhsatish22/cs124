
function Task(props) {
    return (<li>
        <label>
            <input type="checkbox" className="unchecked"/>
                <span className="unchecked-text">{props.task}</span>
        </label>
    </li>);


}


export default Task;