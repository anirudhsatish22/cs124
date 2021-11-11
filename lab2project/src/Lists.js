
import App from './App';
import './App.css';
import ToDoList from "./To-DoList";
import React, {useState} from 'react';

import firebase from "firebase/compat";
import {useCollection} from "react-firebase-hooks/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAMsDbORWI7OtcnI4VjQnY6xEE6XGjZPf0",
    authDomain: "to-do-list-78c30.firebaseapp.com",
    projectId: "to-do-list-78c30",
    storageBucket: "to-do-list-78c30.appspot.com",
    messagingSenderId: "466185835646",
    appId: "1:466185835646:web:dbe8a4413a6cad9f3f742f",
    measurementId: "G-3Q5LDPJYK6"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const ourCollection = "Lists";

function Lists(props) {

    let query = db.collection(ourCollection);
    const [value, loading, error] = useCollection(query);


    const [currentItem, setCurrentItem] = useState(null);


    function enterB() {
        if (value !== null && value !== "") {
            // let newItem = {
            //     id: generateUniqueID(),
            //     task: value,
            //     completed: false,
            //     priority: priority,
            //     created: firebase.database.ServerValue.TIMESTAMP
            // };
            // props.onNewItemAdded(newItem);
            // setValue("")
            return (
                <div>test</div>
            )
        }
    }

    return (
        <div>
            <h1 id="top-title">Lists</h1>
            <div id="container">
                <div id="enter-item">
                    <input type="text" id="input-text" onChange={ (e) => setCurrentItem(e.target.value)} placeholder="Create a list..."/>
                    <span id="enter-span">
                        <span id='enter-button-container'>
                        <button className={currentItem !== "" && currentItem !== null ? "show-buttons" : "grey-buttons"}  onClick={enterB} id="enter-button">+</button>
                        </span>
                    </span>
                </div>
            </div>
        </div>

    )
}


export default Lists;












