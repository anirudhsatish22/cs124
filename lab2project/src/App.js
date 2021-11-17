import './App.css';
import ToDoList from "./To-DoList";
import React, {useState} from 'react';

import firebase from "firebase/compat";
import {useCollection} from "react-firebase-hooks/firestore";
import Lists from "./Lists";

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

function App(props) {
    const [filter, setFilter] = useState('Sort By:');
    const [selectedList, setSelectedList] = useState('');
    const [listName, setListName] = useState('');
    let query = ''
    let docRef = db.collection(ourCollection)
    if (selectedList === '') {
        query = db.collection(ourCollection)
        docRef = query
    }
    else {
        if (filter === 'Sort By:') {
            query = db.collection(ourCollection).doc(selectedList).collection('Tasks');
            docRef = query
        } else {
            query = db.collection(ourCollection).doc(selectedList).collection('Tasks').orderBy(filter);
            docRef = db.collection(ourCollection).doc(selectedList).collection('Tasks')
        }
    }
    const [value, loading, error] = useCollection(query);


    if (loading) {

   return (
        <div id="root"><span className="headerClass"><h1 id="top-title">{listName}</h1><span id="sort-items"><select
            id="sort-button" className="grey-buttons"><option disabled="" selected="">Sort By:</option><option>Priority</option><option>Name</option><option>Date Created</option></select></span></span>
            <div id="container">
                <div className="enter-item"><input type="text" className="input-text" placeholder="Add a task..." value=""/><span id="enter-span"><span id="priority-container"><select id="priority-button" className="grey-buttons"><option disabled="" selected="">Priority:</option><option>1</option><option>2</option><option>3</option></select></span><span id="enter-button-container"><button className="grey-buttons" id="enter-button">+</button></span></span>
                </div>
                <div className="ListItems">
                    <ul id="list">
                        <h2 align="center">Loading...</h2>
                    </ul>
                </div>
                <button className="grey-buttons" id="hide-completed-button">Hide Completed</button>
                <button className="grey-buttons" id="delete-button">Delete Completed</button>
            </div>
        </div>
        );}


    let taskList = value != null? value.docs.map((doc) => doc.data()) : []

    if (selectedList === '') {
        return (
            <Lists list={taskList} displayList={(id,name)=>{setSelectedList(id); setListName(name)}} onContentChange={setField} onNewItemAdded={addItem} onDeleteItem={onDelete}/>
        )
    }
    function setField(id, field, value) {
        if (selectedList === '') {
            if (field === 'name' && (value == "" || value == null)) {
                onDelete([id]);
            } else {
                const doc = docRef.doc(id);
                doc.update({[field]: value});
            }
        }
        else {
            if (field === 'task' && (value == "" || value == null)) {
                onDelete([id]);
            } else {
                const doc = docRef.doc(id);
                doc.update({[field]: value});
                setFilter(filter)
            }
        }
    }
    function addItem(newItem) {
        // const docRef = db.collection(ourCollection).doc(newItem.id);
        docRef.doc(newItem.id).set(newItem);
    }
    function onDelete(listOfIds) {
        listOfIds.map(id => docRef.doc(id).delete());
    }
    function getFilteredList(currentFilter) {
        if (currentFilter === "name") {
            currentFilter = "task"
        }
        if (currentFilter === "date created") {
            currentFilter = "created"
        }
        setFilter(currentFilter)
        }

  return (
      <ToDoList listName={listName.slice(0,28)} list={taskList} goBack={()=>setSelectedList('')} onContentChange={setField} onNewItemAdded={addItem} onDeleteItem={onDelete} filterBy={getFilteredList} filterValue={filter}/>
  );
}

export default App;
