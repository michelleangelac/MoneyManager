import logo from '../assets/logo.png'
import CSS from 'csstype';
import {useState} from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../auth/firebase';
import { NavLink, useNavigate } from 'react-router-dom'

const imgStyles: CSS.Properties = {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '5vh',
    marginBottom: '5vh',
    height: '17vh'
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
    border: '1px solid #DFD2D2'
}

const signUp = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cfmpassword, setCfmPassword] = useState('');

    const onsignUp = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            navigate("/home")
            console.log(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
            alert(errorMessage)
        });
    }

    return (
        <div>
            <img src={logo} style={imgStyles}></img>
            <h1 style={h1Styles}>Create Account</h1>
            <form style={formStyles}>
                <input 
                    style={inputStyles} 
                    type='Username' required 
                    placeholder='Username*' 
                    onChange={(e) => setUsername(e.target.value)}>
                </input><br></br>
                <input 
                    style={inputStyles} 
                    type='Email' required 
                    placeholder='Email*'
                    onChange={(e) => setEmail(e.target.value)}>
                </input><br></br>
                <input 
                    style={inputStyles} 
                    type='Password' required 
                    placeholder='Password*'
                    onChange={(e) => setPassword(e.target.value)}>
                </input><br></br>
                <input 
                    style={inputStyles} 
                    type='Confirm Password' required 
                    placeholder='Confirm Password*'
                    onChange={(e) => setCfmPassword(e.target.value)}>
                </input><br></br>
                <button style={btnStyles} type='button' onClick={onsignUp}>Create</button><br></br>
                <div style={divStyles}>Already have an account? <NavLink style={divStyles} to="/"><i>Login</i></NavLink></div>
            </form>
        </div>
    );
} 


export default signUp;
