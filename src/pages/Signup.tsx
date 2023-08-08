import logo from '../assets/logo.png'
import CSS from 'csstype';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { auth, db } from '../auth/firebase';
import { NavLink, useNavigate } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap';

const bg: CSS.Properties = {
    height: '100vh',
    backgroundImage: "url('/bg2.jpg')"
}

const imgStyles: CSS.Properties = {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '10%',
    marginBottom: '5vh',
    height: '15vh'
}

const h1Styles: CSS.Properties = {
    textAlign: 'center',
    marginBottom: '5vh',
    fontWeight: 'bold',
    fontFamily: 'Inter',
    fontSize: '2.3em'
}

const formStyles: CSS.Properties = {
    textAlign: 'center'
}

const inputStyles: CSS.Properties = {
    marginBottom: '2vh',
    borderRadius: '12px',
    width: '50vh',
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
    border: '1px solid gray'
}

const signUp = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cfmpassword, setCfmPassword] = useState('');

    const onsignUp = async(e) => {
        if(cfmpassword != password) {
            alert("Signup failed: Password and confirm password doesn't match")
            return;
        }
        e.preventDefault();
        await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            alert("Signup successful")
            navigate("/home")
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
            alert(errorMessage)
        });

        await setDoc(doc(db, "Users", email), {
            Username: username,
            ProfilePic: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
            Transactions: [],
            SavingGoals: []
        })
    }

    return (
        <Container fluid>
            <Row>
                <Col style={bg} lg={8}></Col>
                <Col>
                    <img src={logo} style={imgStyles}></img>
                    <h1 style={h1Styles}>CREATE ACCOUNT</h1>
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
                            type='Password' required 
                            placeholder='Confirm Password*'
                            onChange={(e) => setCfmPassword(e.target.value)}>
                        </input><br></br>
                        <button style={btnStyles} type='button' onClick={onsignUp}>Create</button><br></br>
                        <div style={divStyles}>Already have an account? <NavLink style={divStyles} to="/"><i>Login</i></NavLink></div>
                    </form>
                </Col>
            </Row>
        </Container>
    );
} 


export default signUp;