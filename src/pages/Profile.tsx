import Header from "../components/Header";
import { Image, Modal } from 'react-bootstrap'
import CSS from 'csstype';
import { onAuthStateChanged, updateEmail } from "firebase/auth";
import { doc, getDoc, updateDoc, setDoc, deleteDoc } from "firebase/firestore";
import { db, auth } from '../auth/firebase';
import { useState, useEffect, useRef } from 'react';

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
    let user = auth.currentUser;

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [profilePic, setProfilePic] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const usernameInputRef = useRef(null);
    const emailInputRef = useRef(null);

    const handleSave = async(event) => {
        event.preventDefault()
        let user = auth.currentUser;
        let userEmail = user?.email;
        var docRef = doc(db, 'Users', userEmail);
        let newEmail = emailInputRef.current.value;
        let newUsername = usernameInputRef.current.value;
        
        if(newEmail == email) {
            alert("Error: inputted email is the same as the current one.")
            return;
        }
        if(newUsername == username) {
            alert("Error: inputted username is the same as the current one.")
            return;
        }
        if(newEmail != "") {
            setEmail(newEmail);
            let err = false;
            await updateEmail(auth.currentUser, newEmail)
            .then(() => {
                console.log("Email updated")
            })
            .catch((error) => {
                console.log(error)
                err = true 
                alert("An error has occurred, please try again!")
                return
            }); 
            
            if(!err) {
                await setDoc(doc(db, 'Users', newEmail), {
                    Username: username,
                    ProfilePic: profilePic
                });
                await deleteDoc(docRef);
                setEmail(newEmail);
            }
        }
        if(newUsername != "") {
            docRef = doc(db, 'Users', (newEmail ? newEmail : userEmail))
            setUsername(newUsername)
            updateDoc(docRef, { Username: newUsername })
        }
        handleClose();
        location.reload();
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(user) {
                let userEmail = user.email ? user.email : ""
                getData(user)
                .then(data => setUsername(data?.Username))
                .catch(err => console.log(err))
                setEmail(userEmail)

                getData(user)
                .then(data => setProfilePic(data?.ProfilePic))
                .catch(err => console.log(err))
            }
        })
    })

    return (
        <div style={{fontFamily:'Inter'}}>
            <Header/>
            <Image style={imgStyles} roundedCircle src={profilePic}></Image>
            <br></br>
            <form id="form" style={{ textAlign:'center', fontFamily:'Inter', marginTop: '7vh' }}>
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
                <Modal.Body>
                    <form style={{ padding:'2vh 3vh' }}>
                        <label style={{ marginBottom: '1vh', fontSize:'1.1em' }}>Username </label><br></br>
                        <input 
                            placeholder={username} 
                            style={{ borderRadius:'9px', width:'50vh', height:'5.5vh' }}
                            ref={usernameInputRef}>
                        </input><br></br>
                        <label style={{ margin: '3vh 0 1vh 0', fontSize:'1.1em' }}>Email </label><br></br>
                        <input 
                            placeholder={email} 
                            style={{ borderRadius:'9px', width:'50vh', height:'5.5vh' }}
                            ref={emailInputRef}>
                        </input>
                        <button 
                            style={{ margin:'4.5vh 0 2vh 10vh', backgroundColor:'#EFEBEB', border:'1px solid #DFD2D2', width:'50vh', borderRadius:'5px', padding:'7px 10px' }} 
                            onClick={handleSave}>
                            Save Changes
                        </button>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Profile;