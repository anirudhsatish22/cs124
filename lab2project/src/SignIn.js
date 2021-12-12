import {useSignInWithEmailAndPassword} from 'react-firebase-hooks/auth';
import React, {useState} from 'react';
import './App.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import swal from 'sweetalert';
import GoogleButton from 'react-google-button'
import { getAuth, signInWithRedirect } from "firebase/auth";
import Loading from "./loading";


const eye = <FontAwesomeIcon icon={faEye} />;




function SignIn(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showError, setShowError] = useState(false);
    const [passwordShown, setPasswordShown] = useState(false);
    function onSubmit() {
        setShowError(true);
        signInWithEmailAndPassword(email, password);
        console.log(email, password);
    };
    const [
        signInWithEmailAndPassword,
        userCredential, loading, error
    ] = useSignInWithEmailAndPassword(props.auth);
    if (error && showError) {
        swal({
            title: "Error!",
            text: error.message,
            icon: "warning",
            showConfirmButton: true,
            dangerMode: true,
        })
        setShowError(false);
    }

    if (userCredential) {
        // Shouldn't happen because App should see that
        // we are signed in.
        return <div>Unexpectedly signed in already</div>
    } else if (loading) {
        return <></>
    }
    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };
    return <div id="sign-in-container">
        <form id="manual-sign-in-container">
            <h4 id="sign-in-title">Enter your Email and Password to log in!</h4>
            <label id="sign-in-email-label">User Email:</label>
            <input
                aria-label="Enter your user email"
                className="log-in-input"
                id="sign-in-email"
                name="username"
                type="text"
                placeholder="Email..."
                required="true"
                onChange={(e)=>setEmail(e.target.value)}
            />
            <br/>
            <label id="sign-in-pasword-label">Password:</label>
            <input
                aria-label="Enter your password"
                className="log-in-input"
                id="sign-in-password"
                placeholder="Password"
                name="password"
                placeholder="Password..."
                type={passwordShown ? "text" : "password"}
                required="true"
                onChange={(e)=>setPassword(e.target.value)}
            />
            <i aria-label="Click here to show password" id="sign-in-eye" onClick={togglePasswordVisiblity}>{eye}</i>
            <br/>
            <button aria-label="Click here to Sign in!" id="sign-in-button" type="submit" onClick={onSubmit} className="show-buttons">
                Sign In
            </button>
        </form>
        <span id={"google-container"}>
            <GoogleButton aria-label="Click here to sign in with google" id="google-sign-in" style={{
                background: "revert",
                color: "black"
            }}
                          onClick={() =>  props.auth.signInWithPopup(props.googleProvider)}
            />
        </span>

        {/*<button onClick={() =>*/}
        {/*    auth.signInWithPopup(googleProvider)}>Login with Google*/}
        {/*</button>*/}
    </div>
}


export default SignIn;