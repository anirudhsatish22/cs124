import './App.css';
import ToDoList from "./To-DoList";
import React, {useState} from 'react';

import firebase from "firebase/compat";
import swal from 'sweetalert';
import {useCollection} from "react-firebase-hooks/firestore";
import Lists from "./Lists";
import Loading from "./loading";
import SignUp from "./SignUp"
import SignIn from "./SignIn"
import {useAuthState} from 'react-firebase-hooks/auth';
import { FacebookAuthProvider } from "firebase/auth";



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
const userCollection = "Users";
const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();

function App(props) {
    const [user, loading, error] = useAuthState(auth)
    const [showSignUp, setShowSignUp] = useState(false)

    function toggleSignUp() {
        setShowSignUp(!showSignUp)
    }
    if (loading) {
        return <Loading loadingType="" listName=""></Loading>
    }
    else if (user) {
        console.log("Hello", auth.uid)
        return <SignedInApp selectedList={''} user={user} {...props}></SignedInApp>
    }
    else {
        return (
            <>
                {showSignUp && <SignUp  onClose={toggleSignUp} auth={auth}></SignUp>}
                <div id="sign-up-container">
                    <SignIn auth={auth} googleProvider={googleProvider}></SignIn>
                    <button className={"show-buttons"} id="click-to-signup" onClick={toggleSignUp}>New Here? Sign Up!</button>
                </div>
            </>
        )
    }
}

function SignedInApp(props) {
    const [filter, setFilter] = useState('Sort By:');
    const [selectedList, setSelectedList] = useState('');
    const [listName, setListName] = useState('');
    // const [listSharedWith, setListSharedWith] = useState(null);
    let query = ''
    let getSharedQuery = '';
    const sharedQuery = db.collection(ourCollection).where('sharedWith','array-contains',props.user.email);
    let docRef = db.collection(ourCollection)


    function handleLogOut() {
        auth.signOut()
    }
    // Add User to our List of Users
    db.collection(userCollection).doc(props.user.uid).set({email:props.user.email});
    console.log("Successfully Added!");

    if (selectedList === '') {
        query = db.collection(ourCollection).where('ownerEmail','==',props.user.email);
        docRef = db.collection(ourCollection)
    }
    else {
        if (filter === 'Sort By:') {
            query = db.collection(ourCollection).doc(selectedList).collection('Tasks');
            docRef = query
        } else {
            query = db.collection(ourCollection).doc(selectedList).collection('Tasks').orderBy(filter);
            docRef = db.collection(ourCollection).doc(selectedList).collection('Tasks')
        }
        getSharedQuery = db.collection(ourCollection).doc(selectedList);
    }
    const [value, loading, error] = useCollection(query);
    const [sharedValue, sharedLoading, sharedError] = useCollection(sharedQuery);
    const usersQuery = db.collection(userCollection);
    const [users, usersLoading, usersError] = useCollection(usersQuery);
    const [getSharedValue, getSharedLoading, getSharedError] = useCollection(getSharedQuery);

    if (loading) {

   return (
        <Loading loadingType={selectedList} listName={listName}></Loading>
        );}


    let taskList = value != null? value.docs.map((doc) => doc.data()) : []

    let listSharedWith = []
    let isSharedWith = false
    try {
        if (selectedList != "" && !getSharedLoading && !getSharedError) {
            // setListSharedWith(getSharedValue.data())
            // console.log("getSharedValue", getSharedValue.data());
            listSharedWith = getSharedValue.data();
            isSharedWith = listSharedWith.sharedWith.includes(props.user.email);
        }
    }
    catch (error) {
    }
    let sharedList = sharedValue != null? sharedValue.docs.map((doc) => doc.data()) : []
    // if (sharedList != [] && selectedList == '') {
    //     taskList = [...taskList, ...sharedList]
    // }
    let usersList = users != null? users.docs.map((doc) => doc.data().email) : []

    if (selectedList === '') {
        return (
            <>
            <Lists onUnshare={handleUnshare}logOut={handleLogOut} userEmail={props.user.email} taskList={taskList} sharedList={sharedList} displayList={(id,name)=>{setSelectedList(id); setListName(name);}} onContentChange={setField} onNewItemAdded={addItem} onDeleteItem={onDelete}/>
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

    function handleUnshare(listId) {
        const docRef = db.collection(ourCollection).doc(listId);
        docRef.update({
                    sharedWith: firebase.firestore.FieldValue.arrayRemove(props.user.email)
            });
    }
    function shareWith(email, listId) {
        const docRef = db.collection(ourCollection).doc(listId);
        docRef.update({['sharedWith']: email});
        // docRef.set(email)
    //     docRef.update({
    //         sharedWith: firebase.firestore.FieldValue.arrayUnion.apply(this, email)
    // });
    }

  return (
      <>
      <ToDoList logOut={handleLogOut} shareWith={shareWith} email={props.user.email} usersList={usersList} listId={selectedList} listName={listName} list={taskList} listSharedWith={listSharedWith} isSharedWith={isSharedWith} goBack={()=>setSelectedList('')} onContentChange={setField} onNewItemAdded={addItem} onDeleteItem={onDelete} filterBy={getFilteredList} filterValue={filter}/>

      </>
  );
}

export default App;
