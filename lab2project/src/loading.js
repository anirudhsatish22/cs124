import React from 'react';
import logo from './loading.gif'



function Loading(props) {
    if (props.loadingType === '') {

    return (
        <>
        <div id="root"><h1 className="top-title">Lists</h1>
            <div id="list-container">
                <div className="enter-item" id="list-enter-item"><input type="text" maxLength="28" id="list-input-text" placeholder="Create a list..." value=""/>
                    <button className="grey-buttons" id="list-enter-button">+</button>
                    <button className="grey-buttons" id="delete-all-lists">🗑</button>
                </div>
                <div className="ListItems" id="List-of-list-items">
                    <h2 align="center">Loading....</h2>
                    <h3 align="center"><img align="center" src={logo} alt="Loading"/></h3>
                </div>
            </div>
        </div>
        </>
        )
        }
    else {
       return <>
           <div id="root"><span className="headerClass" id="header-one"><h1 className="top-title">{props.listName}</h1></span><span
               className="headerClass" id="header-two"><span id="sort-items"><button id="back-button"
                                                                                     className="show-buttons">←</button><select
               id="sort-button" className="grey-buttons"><option disabled="" selected="">Sort By:</option><option>Priority</option><option>Name</option><option>Date Created</option></select></span></span>
               <div id="container">
                   <div id="enter-item-container" className="enter-item"><input type="text" id="input-text"
                                                                                placeholder="Add a task..."
                                                                                value=""/><select id="priority-button"
                                                                                                 className="grey-buttons">
                       <option disabled="" selected="">Priority:</option>
                       <option>1</option>
                       <option>2</option>
                       <option>3</option>
                   </select>
                       <button className="grey-buttons" id="enter-button">+</button></div>
                   <div className="ListItems">
                       <h2 align="center">Loading....</h2>
                       <h3 align="center"><img align="center" src={logo} alt="Loading"/></h3>
                   </div>
                   <button className="grey-buttons" id="hide-completed-button">Hide Completed</button>
                   <button className="grey-buttons" id="delete-button">Delete Completed</button>
               </div>
           </div>
       </>
    }
    }

export default Loading;

