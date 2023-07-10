import Header from "../components/Header";
import { Image, Modal } from 'react-bootstrap'
import CSS from 'csstype';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from '../auth/firebase';
import { useState, useEffect } from 'react';

const imgStyles: CSS.Properties = {
    width: '30vh',
    margin: '7vh 0 0 100vh',
}

const inputStyles: CSS.Properties = {
    borderRadius: '12px',
    width: '22%',
    height: '7vh',
    padding: '1vh',
    border: '1px solid #282727',
    textAlign: 'center'   
}

const btnStyles: CSS.Properties = {
    width: '50vh',
    height: '6vh',
    borderRadius: '7px',
    marginTop: '5vh',
    fontFamily: 'Inter',
    backgroundColor: '#EFEBEB',
    border: '1px solid #DFD2D2'
}

async function getData(user) {
    let docRef = doc(db, "Users", user.email);
    const docSnap = await getDoc(docRef);
    let data = docSnap.data();
    return data;
}

const Profile = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [profilePic, setProfilePic] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let auth = getAuth();
    let user = auth.currentUser;
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(user) {
                getData(user)
                .then(data => setUsername(data?.Username))
                .catch(err => console.log(err))

                getData(user)
                .then(data => setProfilePic(data?.ProfilePic))
                .catch(err => console.log(err))

                let email = user.email ? user.email : ""
                setEmail(email)
            }
        })
    })

    return (
        <div>
            <Header/>
            <Image style={imgStyles} roundedCircle src={profilePic}></Image>
            <br></br>
            <form style={{ textAlign:'center', fontFamily:'Inter', marginTop: '7vh' }}>
                <label style={{ margin:'0 10vh 5vh 0', fontSize:'1.25em' }}>Username </label>
                <input style={inputStyles} type='text' value={username} readOnly></input><br></br>
                <label style={{ marginRight:'17vh', fontSize:'1.25em'}}>Email </label>
                <input style={inputStyles} type='email' value={email} readOnly></input><br></br>
                <button style={btnStyles} type='button' onClick={handleShow}>Edit profile</button><br></br>
            </form>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                <Modal.Title>Edit Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>Hello</Modal.Body>
                <Modal.Footer>
                <button onClick={handleClose}>
                    Close
                </button>
                <button onClick={handleClose}>
                    Save Changes
                </button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Profile;