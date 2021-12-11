import React, {useState} from 'react';
import './App.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import swal from 'sweetalert';
import {useCreateUserWithEmailAndPassword} from 'react-firebase-hooks/auth';

const eye = <FontAwesomeIcon icon={faEye} />;




function SignUp(props) {
    const [
        createUserWithEmailAndPassword,
        userCredential, loading, error
    ] = useCreateUserWithEmailAndPassword(props.auth);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordShown, setPasswordShown] = useState(false);
    function onSubmit() {
        createUserWithEmailAndPassword(email, password);
        console.log("error msg", error)
    };
    if (error) {
        swal({
            title: "Error!",
            text: error.message,
            icon: "warning",
            showConfirmButton: true,
            dangerMode: true,
        })
    }

    if (userCredential) {
        // Shouldn't happen because App should see that
        // we are signed in.
        return <div>Unexpectedly signed in already</div>
    } else if (loading) {
        return <p>Signing Up...</p>
    }
    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    return <div className={"backdrop"}>
        <div className={"modal modal-sign-in"}>
        <form id="sign-up-pop-container">
            <h4 id="sign-in-title">Sign up with a valid email and password!</h4>
            <label id="sign-in-user-email">User Email:</label>
            <input
                className="input-email log-in-input"
                id="sign-in-email"
                name="username"
                type="text"
                placeholder="Email..."
                required="true"
                onChange={(e)=>setEmail(e.target.value)}
            />
            <br/>
            <label id="sign-up-user-password">Password:</label>
            <input
                id={"sign-in-password"}
                className="input-password log-in-input"
                placeholder="Password"
                name="password"
                placeholder="Password..."
                type={passwordShown ? "text" : "password"}
                required="true"
                onChange={(e)=>setPassword(e.target.value)}
            />
            <i id="sign-in-eye" onClick={togglePasswordVisiblity}>{eye}</i>
            <br/>
            <button id="sign-in-button" className="sign-buttons show-buttons" type="submit" onClick={onSubmit}>
                Sign Up
            </button>
            <button class="show-buttons sign-buttons" id="sign-up-cancel" onClick={props.onClose}>cancel</button>
        </form>
        </div>
    </div>
}

export default SignUp;