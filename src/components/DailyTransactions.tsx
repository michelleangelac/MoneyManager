import CSS from 'csstype';
import { Container, Row, Col } from 'react-bootstrap'
import { useState, useEffect } from 'react';
import Transaction from './Transaction';

const DailyTransactions = (props) => {
    const [date, setDate] = useState("")
    const [totalIncome, setTotalIncome] = useState(0)
    const [totalExpense, setTotalExpense] = useState(0)

    const transactions = props.data;
    let income = 0; let expense = 0;
    useEffect(() => {
        transactions.forEach(tr => {
            let temp = String(new Date(tr.Date.seconds * 1000))
            setDate(temp.substring(4, 10) + ", " + temp.substring(11, 15) + " (" + temp.substring(0, 3) + ")");
            if(tr.Type == "income") {
                income += tr.Amount;
            } else {
                expense += tr.Amount;
            }
        });
        setTotalIncome(income);
        setTotalExpense(expense);
    })

    return (
        <div style={{ width:'100%', fontFamily:'Inter' }}>
            <Container>
                <Row>
                    <Col style={{ textAlign:'left' }} lg={5}>{date}</Col>
                    <Col>Total</Col>
                    <Col style={{ color:'#42B4E5', textAlign:'right' }}>{totalIncome}</Col>
                    <Col style={{ color:'#E55C5C' }}>{totalExpense}</Col>
                    <Col sm={2}></Col>
                </Row>
            </Container>
            <hr style={{ color:'#899499' }}></hr>
            {transactions.map(x => <Transaction style={{ margin:'5vh 0 5vh 0' }} data={x}/>)}
            <hr style={{ backgroundColor:'#C0C0C0', color:'#C0C0C0', height:'3vh' }}></hr>
        </div>
    )
}

export default DailyTransactions;