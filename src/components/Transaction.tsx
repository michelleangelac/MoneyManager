import { Container, Row, Col, Button } from 'react-bootstrap'
import { updateDoc, doc } from 'firebase/firestore';
import { db, auth } from '../auth/firebase';

const handleDelete = async() => {
    
}

const Transaction = (props) => {
    const transaction = props.data;

    return (
        <>
            <Container>
                <Row>
                    <Col style={{ textAlign:'left', color:'#C0C0C0' }}>{transaction.Category}</Col>
                    <Col style={{ textAlign:'left' }} md={4}>{transaction.Name}</Col>
                    <Col style={{ textAlign:'right', color:'#42B4E5' }}>{transaction.Amount}</Col>
                    <Col>
                        <Button onClick={handleDelete} style={{ border:'none', padding:'5px' }} variant='outline-danger'>Delete</Button>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Transaction;