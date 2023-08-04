import logo from '../assets/logo.png'
import CSS from 'csstype';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../auth/firebase';
import { NavLink, useNavigate } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap';

const container: CSS.Properties = {
    width: '100vw',
    height: '100vh',
    backgroundImage: 'url(https://imageupload.io/ib/niPDTzzvN2850Jn_1691137210.jpg)'
}

const imgStyles: CSS.Properties = {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingTop: '5vh',
    marginBottom: '5vh',
    height: '21vh'
}

const h1Styles: CSS.Properties = {
    textAlign: 'center',
    marginBottom: '5vh',
    fontWeight: 'bold',
    fontFamily: 'Inter'
}

const formStyles: CSS.Properties = {
    textAlign: 'center'
}

const inputStyles: CSS.Properties = {
    marginBottom: '2vh',
    borderRadius: '12px',
    width: '22%',
    height: '7vh',
    padding: '1vh',
    border: '1px solid #282727',
    fontFamily: 'Inter'
}

const linkStyles: CSS.Properties = {
    color: 'black',
    fontFamily: 'Inter',
    marginLeft: '25vh'
}

const divStyles: CSS.Properties = {
    color: 'black',
    fontFamily: 'Inter'
}

const btnStyles: CSS.Properties = {
    width: '50vh',
    height: '6vh',
    borderRadius: '7px',
    margin: '3vh 0 3vh 0',
    fontFamily: 'Inter',
    backgroundColor: '#EFEBEB',
    border: '1px solid gray'
}

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
       
    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            navigate("/home")
            console.log(user);
            alert("Login successful")
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
            if(errorMessage == "Firebase: Error (auth/user-not-found)." || errorMessage == "Firebase: Error (auth/wrong-password).") {
                alert("Login failed: Incorrect email or password.")
            } else {
                alert(errorMessage)
            }
        });
    }

    return (
        <div style={container}>
            <img src={logo} style={imgStyles}></img>
            <h1 style={h1Styles}>LOGIN</h1>
            <form style={formStyles}>
                <input 
                    style={inputStyles} 
                    type='email' required 
                    placeholder='Email Address*' 
                    onChange={(e) => setEmail(e.target.value)}>
                </input><br></br>
                <input 
                    style={inputStyles} 
                    type='password' required 
                    placeholder='Password*'
                    onChange={(e) => setPassword(e.target.value)}>
                </input><br></br>
                <NavLink to="/resetpassword" style={linkStyles}><i>Forgot Password?</i></NavLink><br></br>
                <button style={btnStyles} type='button' onClick={onLogin}>Login</button><br></br>
                <div style={divStyles}>Don't have an account? <NavLink style={divStyles} to="/signup"><i>Create Account</i></NavLink></div>
            </form>
        </div>
    );
}

export default Login;