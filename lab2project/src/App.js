import logo from './logo.svg';
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
const ourCollection = "Master-List";





function App(props) {
    const query = db.collection(ourCollection);
    const [value, loading, error] = useCollection(query);

    if (loading) {
       return <h1> Loading...</h1>
    }

    const listOfTasks = value != null? value.docs.map((doc) => doc.data()) : []

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
  return (
      <ToDoList list={listOfTasks} onContentChange={setField} onNewItemAdded={addItem} onDeleteItem={onDelete}></ToDoList>
  );
}

export default App;


//change collection name, new db
//test

// Users -> list -> items



