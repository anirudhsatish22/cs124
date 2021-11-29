import './App.css';
import ToDoList from "./To-DoList";
import React, {useState} from 'react';

import firebase from "firebase/compat";
import {useCollection} from "react-firebase-hooks/firestore";
import Lists from "./Lists";
import Loading from "./loading";
import {useAuthState, useCreateUserWithEmailAndPassword, useSignInWithEmailAndPassword} from 'react-firebase-hooks/auth';

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
const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();

function App(props) {
    const [user, loading, error] = useAuthState(auth) 
    if (loading) {
        return <Loading loadingType="" listName=""></Loading>
    }
    else if (user) {
        return <SignedInApp {...props}></SignedInApp>
    }
    else {
        return (
        <>
        <SignUp></SignUp>
        <SignIn></SignIn>
        </>
        )
    }
}
const FAKE_EMAIL = 'foo@bar.com';
const FAKE_PASSWORD = 'xyzzyxx';
function SignUp() {
    const [
        createUserWithEmailAndPassword,
        userCredential, loading, error
    ] = useCreateUserWithEmailAndPassword(auth);

    if (userCredential) {
        // Shouldn't happen because App should see that
        // we are signed in.
        return <div>Unexpectedly signed in already</div>
    } else if (loading) {
        return <p>Signing up…</p>
    }
    return <div>
        {error && <p>"Error signing up: " {error.message}</p>}
        <button onClick={() =>
            createUserWithEmailAndPassword(FAKE_EMAIL, FAKE_PASSWORD)}>
            Create test user
        </button>

    </div>
}
function SignIn() {
    const [
        signInWithEmailAndPassword,
        userCredential, loading, error
    ] = useSignInWithEmailAndPassword(auth);

    if (userCredential) {
        // Shouldn't happen because App should see that
        // we are signed in.
        return <div>Unexpectedly signed in already</div>
    } else if (loading) {
        return <p>Logging in…</p>
    }
    return <div>
        {error && <p>"Error logging in: " {error.message}</p>}
        <button onClick={() =>
            signInWithEmailAndPassword(FAKE_EMAIL, FAKE_PASSWORD)}>Login with test user Email/PW
        </button>
        <button onClick={() =>
            auth.signInWithPopup(googleProvider)}>Login with Google
        </button>
    </div>
}
function SignedInApp(props) {
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
        <Loading loadingType={selectedList} listName={listName}></Loading>
        );}


    let taskList = value != null? value.docs.map((doc) => doc.data()) : []

    if (selectedList === '') {
        return (
            <>
            <button type="button" onClick={() => auth.signOut()}>Logout</button>
            <Lists list={taskList} displayList={(id,name)=>{setSelectedList(id); setListName(name)}} onContentChange={setField} onNewItemAdded={addItem} onDeleteItem={onDelete}/>
            </>
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
        docRef.doc(newItem.id).set(newItem);
    }
    function onDelete(listOfIds) {
        if (selectedList === "") {
            docRef.doc(listOfIds[0]).collection("Tasks").get().then(querySnapshot =>
                querySnapshot.docs.map(d => docRef.doc(listOfIds[0]).collection('Tasks').doc(d.id).delete())
            );
            docRef.doc(listOfIds[0]).delete();

        }
        else {
            listOfIds.map(id => docRef.doc(id).delete());
        }
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
      <>
      <ToDoList listName={listName} list={taskList} goBack={()=>setSelectedList('')} onContentChange={setField} onNewItemAdded={addItem} onDeleteItem={onDelete} filterBy={getFilteredList} filterValue={filter}/>
      <button type="button" onClick={() => auth.signOut()}>Logout</button>
      </>
  );
}

export default App;
