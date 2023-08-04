import Header from "../components/Header";
import React, { useState, useEffect } from 'react';
import { db } from '../auth/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../auth/firebase';
import CSS from 'csstype';

const topBarStyles: CSS.Properties = {
    backgroundColor: '#D9D9D9',
    height: '250px',
    width: '100%',
    position: 'relative',
  };

const topBarContentStyles: CSS.Properties = {
    position: 'absolute',
    top: '186px',
    left: '254px',
    width: '932px',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

const youSavedStyles: CSS.Properties = {
    fontSize: '30px',
    fontWeight: 'bold',
    fontFamily: 'Inter',
    color: 'black',
};

  const balanceStyles: CSS.Properties = {
    fontSize: '50px',
    fontWeight: 'bold',
    fontFamily: 'Inter',
    color: 'black',
};

const savingsWordStyles: CSS.Properties = {
    fontSize: '30px',
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

    const getUserData = async (user) => {
        const docRef = doc(db, "Users", user.email);
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
  
        setTotalBalance(data?.totalBalance || 0);
        setSavingGoals(data?.savingGoals || []);
      };
      
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            getUserData(user);
          } else {
            setTotalBalance(0);
            setSavingGoals([]);
          }
        });
    
        return () => unsubscribe();

       }, []);

    const handleAddGoal = async (newGoal) => {

        const addNewGoal = async (user) => {
            const docRef = doc(db, "Users", user.email);
            const docSnap = await getDoc(docRef);
            const data = docSnap.data();
      
            const updatedSavingGoals = [...data?.savingGoals, newGoal];
            await setDoc(docRef, { ...data, savingGoals: updatedSavingGoals });
            setSavingGoals(updatedSavingGoals);
        };
    };

    return (
        <div>
            <Header/>
            <div style={topBarStyles}>
                {totalBalance > 0 && (
                    <div style={topBarContentStyles}>
                        <div style={youSavedStyles}>You Saved</div>
                        <div style={balanceStyles}>${totalBalance}</div>
            </div>
        )}
        </div>

        <div
        style={{
          fontSize: '30px',
          fontFamily: 'Inter',
          color: 'black',
          textAlign: 'center',
          marginTop: '212px', 
        }}
        >
        Savings
        </div>

        <div style={savingGoalsBarStyles}>
        {savingGoals.map((goal, index) => (
          <div key={index} style={savingGoalStyles}>
            <p>{goal.name}</p>
            <p>{`$${goal.progress} of $${goal.target}`}</p>
          </div>
        ))}
        </div>
      
    </div>
    );
}

export default Savings;