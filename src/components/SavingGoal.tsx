import { Card, ProgressBar, Modal, Button, ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import { useState } from "react";
import { auth, db } from "../auth/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore"; 

const SavingGoal = (props) => {
    let goal = props.data;
    const [percentage, setPercentage] = useState(Math.round(goal.CurrentAmount / goal.Amount * 100));
    const [currentAmount, setCurrentAmount] = useState(0);
    const [modalType, setModalType] = useState("");

    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
    }
    const handleShow = () => setShow(true);

    const user = auth.currentUser;
    let email = user?.email ? user.email : "";
    const docRef = doc(db, "Users", email);

    const handleSave = async() => {
        const docSnap = await getDoc(docRef);
        let data = docSnap.data();    
        let savingGoals = data?.SavingGoals;
        let newGoal;
        for(let i = 0; i < savingGoals.length; i++) {
            if(goal.Id == savingGoals.at(i).Id) {
                newGoal = {
                    Name: goal.Name,
                    Amount: goal.Amount,
                    CurrentAmount: currentAmount,
                    Id: goal.Id
                }
                savingGoals.splice(i, 1, newGoal);
                break;
            }            
        }
        try {
            await updateDoc(docRef, { SavingGoals: savingGoals });
            alert("The amount of the selected goal is updated.");
        } catch(error) {
            alert("Failed to update: " + error);
        }
        setPercentage(Math.round(currentAmount / goal.Amount * 100));
        handleClose()  
    }

    const handleDelete = async() => {
        const docSnap = await getDoc(docRef);
        let data = docSnap.data();    
        let savingGoals = data?.SavingGoals;
        for(let i = 0; i < savingGoals.length; i++) {
            if(goal.Id == savingGoals.at(i).Id) {
                savingGoals.splice(i, 1);
                break;
            }            
        }    
        try {
            await updateDoc(docRef, { SavingGoals: savingGoals });
            alert("The selected goal was successfully deleted");
        } catch(error) {
            alert("Failed to delete: " + error);
        }
        handleClose()   
    }

    return (
        <div>
            <Card onClick={handleShow} style={{ width: '50vw', cursor:'pointer', marginBottom:'3vh' }}>
                <Card.Body>
                    <div style={{ padding:'1vh' }}>
                        <div style={{ marginBottom:'2vh' }}>
                            <span style={{ fontSize:'1.3em' }}>{goal.Name}</span>
                            <span style={{ fontSize:'1.1em', float:'right' }}>{goal.CurrentAmount} of {goal.Amount}</span>
                        </div>
                        <ProgressBar variant="secondary" now={percentage} label={`${percentage}%`}></ProgressBar>
                    </div>
                </Card.Body>
            </Card>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                <Modal.Title>{goal.Name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form style={{ padding:'2vh 3vh' }}>
                        <ToggleButtonGroup style={{ marginLeft:'8vw' }} type="radio" name="options">
                            <ToggleButton onChange={(e) => setModalType(e.target.value)} variant='outline-dark' id="tbg-radio-1" value="update">
                            Update amount
                            </ToggleButton>
                            <ToggleButton onChange={(e) => setModalType(e.target.value)} variant='outline-danger' id="tbg-radio-2" value="delete">
                            Delete goal
                            </ToggleButton>
                        </ToggleButtonGroup><br></br>
                        {modalType == "update" ? 
                        <div>
                            <label style={{ margin: '2vh 0 1vh 0', fontSize:'1.1em' }}>Current amount </label><br></br>
                            <input 
                                placeholder="Input should be numeric" required
                                style={{ borderRadius:'9px', width:'50vh', height:'5.5vh' }}
                                onChange={(e) => setCurrentAmount(Number(e.target.value))}
                            ></input><br></br>
                            <Button 
                                style={{ margin:'4.5vh 0 2vh 4vw', width:'50vh', padding:'7px 10px' }} 
                                variant='dark'
                                onClick={handleSave}
                            >
                                Save
                            </Button>
                        </div>
                        : 
                        <div style={{ textAlign:'center' }}>
                            <div style={{ margin:'2vh 0 3vh 0' }}>Are you sure you want to delete this saving goal?</div>
                            <Button onClick={handleDelete} style={{ width:'20vw', marginBottom:'2vh' }} variant='danger'>Delete</Button>
                        </div>
                        }
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default SavingGoal;