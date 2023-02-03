import React, {useState} from 'react';
import './App.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import swal from 'sweetalert';
import Loading from "./loading";
import {useCreateUserWithEmailAndPassword} from 'react-firebase-hooks/auth';

const eye = <FontAwesomeIcon icon={faEye} />;




function SignUp(props) {
    const [
        createUserWithEmailAndPassword,
        userCredential, loading, error] = useCreateUserWithEmailAndPassword(props.auth);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showError, setShowError] = useState(true);
    const [passwordShown, setPasswordShown] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);

    function onSubmit() {

            if (password !== confirmPassword) {
                swal({
                    title: "Passwords do not match!",
                    text: "Make sure that your Passwords Match!",
                    icon: "warning",
                    showConfirmButton: true,
                    dangerMode: true,
                })
            }
            else {
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
                else {
                    createUserWithEmailAndPassword(email, password);
                }
            }
            if (loading) {
                return <Loading loadingType="" listName=""></Loading>
            }

        }



    if (userCredential) {
        // Shouldn't happen because App should see that
        // we are signed in.
        return <div>Unexpectedly signed in already</div>
    }
    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    }
    const toggleConfirmPasswordVisiblity = () => {
        setConfirmPasswordShown(confirmPasswordShown ? false : true);
    }

    return <div className={"backdrop"}>
        <div className={"modal modal-sign-in"}>
        <form id="sign-up-pop-container">
            <h4 id="sign-in-title">Sign up with a valid email and password!</h4>
            <label id="sign-in-email-label">User Email:</label>
            <input
                aria-label="Enter your email that you wish to sign in with"
                className="input-email log-in-input"
                id="sign-in-email"
                name="username"
                type="text"
                placeholder="Email..."
                required="true"
                onChange={(e)=>setEmail(e.target.value)}
            />
            <br/>
            <label id="sign-in-password-label">Password:</label>
            <input
                aria-label="Enter your password"
                id={"sign-in-password"}
                className="input-password log-in-input"
                placeholder="Password"
                name="password"
                placeholder="Password..."
                type={passwordShown ? "text" : "password"}
                required="true"
                onChange={(e)=>setPassword(e.target.value)}
            />
            <i aria-label="Click here to show password" id="sign-in-eye" onClick={togglePasswordVisiblity}>{eye}</i>
            <label id="confirm-password-label">Confirm Password:</label>
            <input
                aria-label="Confirm your password by entering it here again"
                id={"confirm-password"}
                className="input-password log-in-input"
                placeholder="Password"
                name="password"
                placeholder="Password..."
                type={confirmPasswordShown ? "text" : "password"}
                required="true"
                onChange={(e)=>setConfirmPassword(e.target.value)}
            />
            <i aria-label="Click here to show password" id="confirm-eye" onClick={toggleConfirmPasswordVisiblity}>{eye}</i>
            <br/>
            <button aria-label="Click this button to Sign up with your newly entered username and password" id="sign-up-button" className="sign-buttons show-buttons" onClick={onSubmit}>
                Sign Up
            </button>
            <button aria-label="Click this button to cancel changes and go back to the log in screen" class="show-buttons sign-buttons" id="sign-up-cancel" onClick={props.onClose}>Cancel</button>
        </form>
        </div>
    </div>
}

export default SignUp;