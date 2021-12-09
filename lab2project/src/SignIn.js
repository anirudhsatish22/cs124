import {useSignInWithEmailAndPassword} from 'react-firebase-hooks/auth';
import React, {useState} from 'react';
import './App.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import swal from 'sweetalert';
import GoogleButton from 'react-google-button'


const eye = <FontAwesomeIcon icon={faEye} />;




function SignIn(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordShown, setPasswordShown] = useState(false);
    function onSubmit() {
        signInWithEmailAndPassword(email, password);
        console.log(email, password);
    };
    const [
        signInWithEmailAndPassword,
        userCredential, loading, error
    ] = useSignInWithEmailAndPassword(props.auth);
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
        return <p>Logging in…</p>
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
                Sign In
            </button>
        </form>
        <GoogleButton style={{
            background: "revert"
        }}
                      onClick={() => props.auth.signInWithPopup(props.googleProvider)}
        />
        {/*<button onClick={() =>*/}
        {/*    auth.signInWithPopup(googleProvider)}>Login with Google*/}
        {/*</button>*/}
    </div>
}


export default SignIn;