import logo from '../assets/logo.png'
import CSS from 'csstype';
import { Link } from 'react-router-dom'

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
    border: '1px solid #DFD2D2'
}

function Login() {
    return (
        <div>
            <img src={logo} style={imgStyles}></img>
            <h1 style={h1Styles}>LOGIN</h1>
            <form style={formStyles}>
                <input style={inputStyles} type='email' placeholder='Email Address*'></input><br></br>
                <input style={inputStyles} type='password' placeholder='Password*'></input><br></br>
                <Link to="/resetpassword" style={linkStyles}><i>Forgot Password?</i></Link><br></br>
                <button style={btnStyles} type='button'>Confirm</button><br></br>
                <div style={divStyles}>Don't have an account? <Link style={divStyles} to="/signup"><i>Create Account</i></Link></div>
            </form>
        </div>
    );
}

export default Login;