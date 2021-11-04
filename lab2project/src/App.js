import logo from './logo.svg';
import './App.css';
import ToDoList from "./To-DoList";
import React, {useState} from 'react';

import firebase from "firebase/compat";
import { query, orderBy, limit } from "firebase/firestore";
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
const ourCollection = "Master-List";

function App(props) {
    const [filter, setFilter] = useState('task');
    const query = db.collection(ourCollection).orderBy(filter);
    const [value, loading, error] = useCollection(query);

    if (loading) {
       return <h1> Loading...</h1>
    }

    // let taskList = null;
    // query.orderBy(filter).get().then((snapshot)=> {taskList = snapshot.docs.map((doc)=> doc.data())
    //     console.log("inside",taskList);
    // })
    // console.log("outside",taskList)
    let taskList = value != null? value.docs.map((doc) => doc.data()) : []
    function setField(id, field, value) {
        if (field === 'task' && (value == "" || value == null) ) {
            onDelete([id]);
            }

        else {
            db.collection(ourCollection).doc(id).update({[field]:value});
        }
    }
    function addItem(newItem) {
        const docRef = db.collection(ourCollection).doc(newItem.id);
        docRef.set(newItem);
    }
    function onDelete(listOfIds) {
        listOfIds.map(id => db.collection(ourCollection).doc(id).delete());
    }
    function getFilteredList(currentFilter) {
        if (currentFilter === "name") {
            currentFilter = "task"
        }
        if (currentFilter === "creation date") {
            currentFilter = "created"
        }
        setFilter(currentFilter)
        }

  return (
      <ToDoList list={taskList} onContentChange={setField} onNewItemAdded={addItem} onDeleteItem={onDelete} filterBy={getFilteredList} filterValue={filter}></ToDoList>
  );
}

export default App;


//change collection name, new db
//test

// Users -> list -> items



