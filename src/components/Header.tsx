import logo from '../assets/logo.png'
import './Header.css'
import { signOut } from "firebase/auth";
import { auth } from '../auth/firebase';
import { useNavigate } from 'react-router-dom';

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
        marginRight: '10vh'
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
        <nav style={styles.holder} className="navbar navbar-expand-lg navbar-light bg-light">
            <img src={logo} style={styles.img}></img>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a style={styles.leftLink} id='home' className="nav-link" href="/home">Home</a>
                    </li>
                    <li className="nav-item">
                        <a style={styles.links} className="nav-link" href="/goals">Goals</a>
                    </li>
                    <li className="nav-item">
                        <a style={styles.links} className="nav-link" href="/profile">Profile</a>
                    </li>
                </ul>
                <button type='button' style={styles.btn} className='btn' data-toggle="button" onClick={handleLogout}>Signout</button>
            </div>
        </nav>
    )
}

export default Header;