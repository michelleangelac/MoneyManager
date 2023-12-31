import Header from "../components/Header";
import { Image, Modal } from 'react-bootstrap'
import CSS from 'csstype';
import { onAuthStateChanged, updateEmail } from "firebase/auth";
import { doc, getDoc, updateDoc, setDoc, deleteDoc } from "firebase/firestore";
import { db, auth, storage } from '../auth/firebase';
import { useState, useEffect } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Resizer from "react-image-file-resizer";

const imgStyles: CSS.Properties = {
    width: '30vh',
    height: '30vh',
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
    width: '40vh',
    height: '6vh',
    borderRadius: '7px',
    marginTop: '6vh',
    fontFamily: 'Inter',
    backgroundColor: '#EFEBEB',
    border: '1px solid #DFD2D2'
}

const btn2Styles: CSS.Properties = {
    width: '40vh',
    height: '6vh',
    borderRadius: '7px',
    margin: '6vh 0 0 5vh',
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
    const [newUsername, setNewUsername] = useState("");
    const [newEmail, setNewEmail] = useState("");

    const [profilePic, setProfilePic] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
    const [transactions, setTransactions] = useState([])
    const [savingGoals, setSavingGoals] = useState([])

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [show2, setShow2] = useState(false);
    const handleClose2 = () => {
        setShow2(false);
        setPercent(0);
    }
    const handleShow2 = () => setShow2(true);

    const handleSave = async(event) => {
        event.preventDefault()
        let user = auth.currentUser;
        let userEmail = user?.email ? user.email : "";
        let docRef = doc(db, "Users", userEmail);
        
        if(newEmail == email) {
            alert("Error: inputted email is the same as the current one.")
            return;
        }
        if(newUsername == username) {
            alert("Error: inputted username is the same as the current one.")
            return;
        }
        if(newEmail != "") {
            let err = false;
            await updateEmail(auth.currentUser!, newEmail)
            .then(() => {
                console.log("Email has been updated")
            })
            .catch((error) => {
                console.log(error.message)
                err = true 
                alert("An error has occurred, please try again!")
                return
            }); 
            
            if(!err) {
                await setDoc(doc(db, 'Users', newEmail), {
                    Username: username,
                    ProfilePic: profilePic,
                    Transactions: transactions,
                    SavingGoals: savingGoals
                });
                await deleteDoc(docRef);
                setEmail(newEmail);
            }
        }
        if(newUsername != "") {
            try {
                console.log(newEmail, userEmail)
                docRef = doc(db, 'Users', (newEmail != "" ? newEmail : userEmail))
                setUsername(newUsername)
                await updateDoc(docRef, { Username: newUsername })
                alert("Username has been updated.")
            } catch(error) {
                alert("An error has occurred, please try again!")
            }
        }
        handleClose();
        location.reload();
    }

    const [image, setImage] = useState("");
    const [percent, setPercent] = useState(0);
    
    const resizeImage = (image) => 
        new Promise((resolve) => {
            Resizer.imageFileResizer(
                image,
                300,
                300, 
                "JPEG",
                100,
                0,
                (uri) => {
                    resolve(uri)
                },
                "base64"
            )
        })

    const handleChange = async(e) => {
        setImage(e.target.files[0])
    }

    const handleUpload = async(event) => {
        event.preventDefault()
        console.log(image)
        if(!image) {
            alert("Please upload an image first.");
            return;
        }
        const imageResized = await resizeImage(image) as RequestInfo;
        const user = auth.currentUser;
        const storageRef = ref(storage, user?.email!);
        console.log(storageRef)
        fetch(imageResized)
        .then((res) => res.blob())
        .then((blob) => {
            const uploadImage = uploadBytesResumable(storageRef, blob);
            uploadImage.on(
                'state_changed',
                (snapshot) => {
                    const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    setPercent(percent);
                },
                (error) => { 
                    console.log(error)
                    alert(error) 
                },
                () => {
                    getDownloadURL(uploadImage.snapshot.ref)
                    .then((url) => {
                        console.log(url)
                        try {
                            updateDoc(doc(db, "Users", user?.email!), { ProfilePic: url });
                            setProfilePic(url);
                            alert("The profile picture has been updated.")
                        } catch(error) {
                            alert("An error has occurred, please try again!")
                        }
                    });
                    console.log("FINISH UPLOADING!");
                }
            )
        })
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

                getData(user)
                .then(data => {
                    setTransactions(data?.Transactions)
                    setSavingGoals(data?.SavingGoals)
                })
                .catch(err => console.log(err))
            }
        })
    })

    return (
        <div style={{fontFamily:'Inter'}}>
            <Header/>
            <Image style={imgStyles} roundedCircle thumbnail src={profilePic}></Image>
            <br></br>
            <form id="form" style={{ textAlign:'center', fontFamily:'Inter', marginTop: '7vh' }}>
                <label style={{ margin:'0 10vh 5vh 0', fontSize:'1.25em' }}>Username </label>
                <input style={inputStyles} type='text' value={username} readOnly></input><br></br>
                <label style={{ marginRight:'17vh', fontSize:'1.25em'}}>Email </label>
                <input style={inputStyles} type='email' value={email} readOnly></input><br></br>
                <button style={btnStyles} type='button' onClick={handleShow}>Edit profile</button>
                <button style={btn2Styles} type='button' onClick={handleShow2}>Change profile picture</button><br></br>
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
                            onChange={(e) => setNewUsername(e.target.value)}
                        >
                        </input><br></br>
                        <label style={{ margin: '3vh 0 1vh 0', fontSize:'1.1em' }}>Email </label><br></br>
                        <input 
                            placeholder={email} 
                            style={{ borderRadius:'9px', width:'50vh', height:'5.5vh' }}
                            onChange={(e) => setNewEmail(e.target.value)}
                        >
                        </input>
                        <button 
                            style={{ margin:'4.5vh 0 2vh 10vh', backgroundColor:'#EFEBEB', border:'1px solid #DFD2D2', width:'50vh', borderRadius:'5px', padding:'7px 10px' }} 
                            onClick={handleSave}>
                            Save Changes
                        </button>
                    </form>
                </Modal.Body>
            </Modal>
            <Modal show={show2} onHide={handleClose2} centered>
                <Modal.Header closeButton>
                <Modal.Title>Change Profile Picture</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form style={{ padding:'2vh 3vh', textAlign:'center' }}>
                        <div style={{ textAlign:'center', fontSize:'1.2em', marginBottom:'2vh' }}>Upload your image here</div>
                        <input
                            type="file"
                            accept="image/*"
                            style={{ marginLeft:'10vh' }}
                            onChange={handleChange}
                        /><br></br>
                        <button 
                            style={{ margin:'3vh 0 2vh 0', backgroundColor:'#EFEBEB', border:'1px solid #DFD2D2', width:'45vh', borderRadius:'5px', padding:'7px 10px' }} 
                            onClick={handleUpload}>
                            Upload
                        </button>
                        <p>{percent}% done</p>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Profile;