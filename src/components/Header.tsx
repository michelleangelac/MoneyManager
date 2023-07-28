import logo from '../assets/logo.png'
import { signOut } from "firebase/auth";
import { auth } from '../auth/firebase';
import { useNavigate, useLocation } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';

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
        marginLeft: '10vw',
        marginRight: '5vw',
    },
    links: {
        display: 'flex',
        fontSize: '24px',
        marginRight: '5vw'
    },
    btn: {
        border: '2px solid #DFD2D2',
        borderRadius: '30px',
        padding: '5px 15px',
        backgroundColor: '#EFEBEB',
        color: 'black',
        fontSize: '24px',
        marginLeft: '5vw'
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
        <Navbar style={styles.holder} expand="lg" bg='light' data-bs-theme="light">
            <img src={logo} style={styles.img}></img>
            <Nav activeKey={location.pathname} className="me-auto">
                <Nav.Link style={styles.leftLink} href="/home">Home</Nav.Link>
                <Nav.Link style={styles.links} href="/savings">Savings</Nav.Link>
                <Nav.Link style={styles.links} href="/insights">Insights</Nav.Link>
                <Nav.Link style={styles.links} href="/profile">Profile</Nav.Link>
                <Button type='button' style={styles.btn} className='btn' data-toggle="button" onClick={handleLogout}>Signout</Button>
            </Nav>
        </Navbar>
    )
}

export default Header;