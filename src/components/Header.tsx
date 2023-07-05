import logo from '../assets/logo.png'
import './Header.css'
import { signOut } from "firebase/auth";
import { auth } from '../auth/firebase';
import { useNavigate, useLocation } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

const styles = {
    holder: {
        fontFamily: 'Inter',
        width: '100%'
    },
    img: {
        display: 'block',
        margin: '1vh 2vh 1vh 3vh',
        height: '11vh'
    },
    leftLink: {
        display: 'flex',
        fontSize: '24px',
        marginLeft: '25vh',
        marginRight: '10vh',
    },
    links: {
        display: 'flex',
        fontSize: '24px',
        marginLeft: '10vh',
        marginRight: '10vh'
    },
    btn: {
        display: 'flex',
        border: '2px solid #DFD2D2',
        borderRadius: '30px',
        padding: '5px 15px',
        backgroundColor: '#EFEBEB',
        fontSize: '24px',
        marginLeft: '25vh',
        marginRight: '10vh'
    }
}

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
 
    const handleLogout = () => {               
        signOut(auth).then(() => {
        // Sign-out successful.
            navigate("/");
            console.log("Signed out successfully")
        }).catch((error) => {
            alert("Failed to sign out: " + error.message)
        });
    }

    return (
        <Navbar style={styles.holder} bg='light' data-bs-theme="light">
            <img src={logo} style={styles.img}></img>
            <Nav activeKey={location.pathname} className="me-auto">
                <Nav.Link style={styles.leftLink} href="/home">Home</Nav.Link>
                <Nav.Link style={styles.links} href="/goals">Goals</Nav.Link>
                <Nav.Link style={styles.links} href="/profile">Profile</Nav.Link>
                </Nav>
                <button type='button' style={styles.btn} className='btn' data-toggle="button" onClick={handleLogout}>Signout</button>
        </Navbar>
    )
}

export default Header;