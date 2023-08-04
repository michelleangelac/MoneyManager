import { Container, Row, Col, Button, Modal } from 'react-bootstrap'
import { updateDoc, doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../auth/firebase';
import { useState } from 'react';

const Transaction = (props) => {
    const transaction = props.data;
    let amtColor = "";
    if(transaction.Type == "income") {
        amtColor = '#42B4E5'
    } else {
        amtColor = '#E55C5C'
    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDelete = async() => {
        const user = auth.currentUser;
        let email = user?.email;
        const docRef = doc(db, "Users", email);
        const docSnap = await getDoc(docRef);
        let data = docSnap.data();    
        let userTransactions = data?.Transactions;
        for(let i = 0; i < userTransactions.length; i++) {
            let d1 = String(new Date(userTransactions.at(i).Date.seconds * 1000))
            let d2 = String(new Date(transaction.Date.seconds * 1000))
            if(d1 == d2) {
                userTransactions.splice(i, 1);
            }
        }    
        try {
            await updateDoc(docRef, { Transactions: userTransactions });
            alert("The transaction was successfully deleted");
        } catch(error) {
            alert("Failed to delete: " + error);
        }
        handleClose()
    }

    return (
        <>
            <Container>
                <Row>
                    <Col style={{ textAlign:'left', color:'#C0C0C0' }}>{transaction.Category}</Col>
                    <Col style={{ textAlign:'left' }} md={4}>{transaction.Name}</Col>
                    <Col style={{ textAlign:'right', color:amtColor }}>{transaction.Amount}</Col>
                    <Col>
                        <Button onClick={handleShow} style={{ border:'none', padding:'5px' }} variant='outline-danger'>Delete</Button>
                    </Col>
                </Row>
            </Container>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                <Modal.Title>Delete Transaction</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ textAlign:'center' }}>
                    <div style={{ margin:'2vh 0 3vh 0' }}>Are you sure you want to delete this transaction?</div>
                    <Button onClick={handleDelete} style={{ width:'20vw', marginBottom:'2vh' }} variant='danger'>Delete</Button>
                </Modal.Body>
            </Modal> 
        </>
    )
}

export default Transaction;