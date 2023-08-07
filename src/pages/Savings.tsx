import Header from "../components/Header";
import { useState, useEffect } from 'react';
import { db, auth } from '../auth/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import CSS from 'csstype';
import { Button, Modal } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import SavingGoal from "../components/SavingGoal";

const topBarStyles: CSS.Properties = {
    backgroundColor: '#EFEBEB',
    height: '20vh',
    width: '50%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '5vh',
    border: '2px solid #DFD2D2'
};

const topBarContentStyles: CSS.Properties = {
    padding: '3vh',
    textAlign: 'center'
};

const youSavedStyles: CSS.Properties = {
    fontFamily: 'Inter',
    color: 'black',
};

  const balanceStyles: CSS.Properties = {
    fontSize: '1.5em',
    fontWeight: 'bold',
    fontFamily: 'Inter',
    color: 'black',
};

const savingGoalsBarStyles: CSS.Properties = {
    backgroundColor: '#D9D9D9',
    height: '180px',
    width: '713px',
    borderRadius: '20px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
};

const savingGoalStyles: CSS.Properties = {
    fontSize: '20px',
    fontWeight: 'bold',
    fontFamily: 'Inter',
    color: 'black',
    margin: '10px 0',
};
  

function Savings() {

    const [totalBalance, setTotalBalance] = useState(0);
    const [savingGoals, setSavingGoals] = useState([]);
    const [name, setName] = useState("");
    const [amount, setAmount] = useState(0);
    
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
    }
    const handleShow = () => setShow(true);

    const getUserData = async (user) => {
        const docRef = doc(db, "Users", user.email);
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        return data;
      };
      
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            getUserData(user)
            .then(data => {
                let userTransactions = data?.Transactions;
                let temp = 0;
                userTransactions.forEach(tr => {
                    if(tr.Type == "income") {
                        temp += tr.Amount;
                    } else {
                        temp -= tr.Amount;
                    }
                });

                setTotalBalance(temp);
                setSavingGoals(data?.SavingGoals);
            })
          }
        });
       });

    const handleAddGoal = async (e) => {
        if (name == "" || amount == 0) {
            alert("Any of the fields cannot be empty!")
            return;
        }
        e.preventDefault()
        const user = auth.currentUser;
        let email = user?.email ? user?.email : "";
        const docRef = doc(db, "Users", email);
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        
        let savingGoalsList = data?.SavingGoals;
        savingGoalsList.push({
            Name: name,
            Amount: amount,
            CurrentAmount: 0,
            Id: (Math.random() * 100000)
        })

        try {
            await updateDoc(docRef, { SavingGoals: savingGoalsList })
            alert("The saving goal was succesfully added.")
        } catch(error) {
            alert("Failed to add the saving goal: " + error);
        }
        handleClose()
    };

    return (
        <div style={{ fontFamily:'Inter' }}>
            <Header/>
            <div style={{ fontSize:'1.2em' }}>
                <div style={topBarStyles}>
                    <div style={topBarContentStyles}>
                        <span style={youSavedStyles}>You currently saved</span><br></br>
                        <span style={balanceStyles}>{totalBalance}</span>
                    </div>
                </div>
            </div>

            <h1 style={{ color: 'black', textAlign: 'center', margin: '8vh 0 2vh 0' }}>
                Saving Goals
            </h1>
            <div style={{ marginLeft:'25%' }}>
                {savingGoals.length > 0 ? savingGoals.map(x => <SavingGoal data={x}></SavingGoal>) : <></>}
            </div>

            <Button onClick={handleShow} variant='secondary' size='lg' style={{ position:'fixed', right:'2vw', bottom:'4vh' }}>
                <FaPlus
                    style={{ color:'white', fontSize:'1.25em' }}
                />
            </Button>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                <Modal.Title>Add Saving Goal</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form style={{ padding:'2vh 3vh' }}>
                        <label style={{ marginBottom: '1vh', fontSize:'1.1em' }}>Name </label><br></br>
                        <input 
                            placeholder="" required
                            style={{ borderRadius:'9px', width:'50vh', height:'5.5vh' }}
                            onChange={(e) => setName(e.target.value)}
                        ></input><br></br>
                        <label style={{ margin: '2vh 0 1vh 0', fontSize:'1.1em' }}>Amount </label><br></br>
                        <input 
                            placeholder="Input should be numeric" required
                            style={{ borderRadius:'9px', width:'50vh', height:'5.5vh' }}
                            onChange={(e) => setAmount(Number(e.target.value))}
                        ></input><br></br>
                        <Button 
                            style={{ margin:'4.5vh 0 2vh 4vw', width:'50vh', padding:'7px 10px' }} 
                            variant='dark'
                            onClick={handleAddGoal}
                        >
                            Add
                        </Button>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default Savings;