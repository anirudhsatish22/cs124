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

    return <div>
        <form>
            <input
                name="username"
                type="text"
                placeholder="Enter Email Here..."
                required="true"
                onChange={(e)=>setEmail(e.target.value)}
            />
            <br/>
            <input
                placeholder="Password"
                name="password"
                placeholder="Enter Password Here..."
                type={passwordShown ? "text" : "password"}
                required="true"
                onChange={(e)=>setPassword(e.target.value)}
            />
            <i onClick={togglePasswordVisiblity}>{eye}</i>
            <br/>
            <button type="submit" onClick={onSubmit}>
                Sign Up
            </button>
        </form>
    </div>
}

export default SignUp;