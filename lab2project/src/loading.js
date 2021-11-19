import React from 'react';
import logo from './loading.gif'



function Loading(props) {
    return (
    <>
        <span className="headerClass">
        <h1 className="top-title">{props.listName}</h1>
        </span>
        <span className='headerClass' id="header-two">
                <span id='sort-items'>
                <button id="back-button" className="show-buttons">←</button>
                <select id="sort-button" className="show-buttons">
                    <option selected disabled>Sort By:</option>
                    <option>Priority</option>
                    <option>Name</option>
                    <option>Date Created</option>
                </select>
                </span>
        </span>
        <div id="container">
            <div className="enter-item">
                <input type="text" id="input-text" placeholder="Add a task..." value=""/>
                <span id="enter-span">
                    <span id="priority-container">
                        <select id="priority-button" className="grey-buttons">
                            <option disabled="" selected="">Priority:</option>
                            <option>1</option><option>2</option><option>3</option>
                        </select>
                    </span><
                    span id="enter-button-container">
                    <button className="grey-buttons" id="enter-button">+</button>
                </span>
                </span>
            </div>
            <div className="ListItems">
                <ul id="list">
                    <h2 align="center">Loading...</h2>
                    <h3 align="center"><img align="center" src={logo} alt="Loading"/></h3>
                </ul>
            </div>
            <button className="grey-buttons" id="hide-completed-button">Hide Completed</button>
            <button className="grey-buttons" id="delete-button">Delete Completed</button>
        </div>

        {/*<div id="loading-container">*/}
        {/*    <img src={logo} alt="Loading"/>*/}
        {/*</div>*/}
    </>)
}


export default Loading;

