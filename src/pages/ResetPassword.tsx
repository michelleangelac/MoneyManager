import logo from '../assets/logo.png'
import CSS from 'csstype'
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../auth/firebase'
import { Container, Row, Col } from 'react-bootstrap';

const bg: CSS.Properties = {
    height: '100vh',
    backgroundImage: "url('/bg2.jpg')"
}

const imgStyles: CSS.Properties = {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '15%',
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

const ResetPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');

    const sendPasswordReset = async () => {
        try {
          await sendPasswordResetEmail(auth, email);
          alert("Password reset link sent!");
          navigate('/')
        } catch (err) {
          console.error(err);
          alert(err);
        }
    }

    return (
        <Container fluid>
            <Row>
                <Col style={bg} lg={8}></Col>
                <Col>
                    <img src={logo} style={imgStyles}></img>
                    <h1 style={h1Styles}>RESET PASSWORD</h1>
                    <div style={{ textAlign:'center', fontSize:'1.2em' }}>Please enter your email address to</div>
                    <div style={{ textAlign:'center', fontSize:'1.2em', marginBottom:'3vh' }}>receive a password recovery email</div>
                    <form style={formStyles}>
                        <input 
                            style={inputStyles} 
                            type='email' required 
                            placeholder='Email Address*' 
                            onChange={(e) => setEmail(e.target.value)}>
                        </input><br></br>
                        <button style={btnStyles} type='button' onClick={sendPasswordReset}>Send Email</button><br></br>
                        <div style={divStyles}>Don't have an account? <NavLink style={divStyles} to="/signup"><i>Create Account</i></NavLink></div>
                    </form>
                </Col>
            </Row>
        </Container>
    );
}

export default ResetPassword;