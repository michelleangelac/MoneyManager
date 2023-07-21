import CSS from 'csstype';
import Header from '../components/Header';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa'
import { MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowLeft } from 'react-icons/md'
import { Button, Container, Row, Col, Modal, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import { updateDoc, doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../auth/firebase';
import DailyTransactions from '../components/DailyTransactions';

const hr: CSS.Properties = {
    color:'#899499'
}

async function getData(user) {
    let docRef = doc(db, "Users", user.email);
    const docSnap = await getDoc(docRef);
    let data = docSnap.data();
    return data;
}

const Home = () => {
    const [startDate, setStartDate] = useState(new Date());
    let currentMonth = String(startDate).substring(4,7);

    const [income, setIncome] = useState(0);
    const [expense, setExpense] = useState(0);
    const [balance, setBalance] = useState(0);

    const [type, setType] = useState("")
    const [name, setName] = useState("")
    const [amount, setAmount] = useState(0)
    const [date, setDate] = useState(new Date())
    const incomeCategories = ["Allowance", "Salary"]
    const expenseCategories = ["Food", "Cca", "Transportation", "Education", "Housing", "Shopping", "Entertainment"]
    const [category, setCategory] = useState("")

    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
        setType("");
        setCategory("");
    }
    const handleShow = () => setShow(true);
    
    const handleSave = async(e) => {
        if(type == "") {
            alert("Please select the transaction type first!")
            return;
        }
        if (name == "" || amount == 0 || category == "") {
            alert("Any of the fields cannot be empty!")
            return;
        }
        e.preventDefault()
        let user = auth.currentUser;
        let userEmail = user?.email;
        let docRef = doc(db, "Users", userEmail);
        let docSnap = await getDoc(docRef);
        let data = docSnap.data();
        setCategory(category);

        let transactionList = data?.Transactions;
        transactionList.push({
            Name: name,
            Amount: amount,
            Date: date,
            Category: category,
            Type: type
        })
        try {
            await updateDoc(docRef, { Transactions: transactionList })
            alert("The transaction was succesfully created.")
        } catch(error) {
            alert("Failed to create transaction: " + error);
        }
        handleClose()
    }

    const [transactions, setTransactions] = useState(new Array());
    const user = auth.currentUser;

    useEffect(() => {
            onAuthStateChanged(auth, (user) => {
            if(user) {
                getData(user)
                .then(data => {
                    let userTransactions = data?.Transactions; 
                    let tempIncome = 0; let tempExpense = 0;
                    let temp = new Array();
                    userTransactions.forEach(tr => {
                        const tDate = tr.Date
                        const tAmount = tr.Amount  
                        let month = String(new Date(tDate.seconds * 1000)).substring(4,7);
                        if(currentMonth == month) {
                            temp.push(tr)
                            if(tr.Type == "income") {
                                tempIncome += tAmount;
                            } else {
                                tempExpense += tAmount;
                            }
                        }
                    });
                    temp.sort(function(a, b) {return b.Date - a.Date})

                    let temp2 = new Array(); let i = 0; let arr = new Array(); let helper = false;
                    if(temp.length == 1) {
                        temp2.push(temp);
                    }
                    while (i < temp.length - 1) {
                        let d1 = String(new Date(temp.at(i).Date.seconds * 1000)).substring(4,15);
                        let d2 = String(new Date(temp.at(i+1).Date.seconds * 1000)).substring(4,15);
                        if(d1 == d2) {
                            arr.push(temp.at(i))
                            helper = true;
                            if(i == temp.length - 2) {
                                arr.push(temp.at(i+1))
                                temp2.push(arr)
                                //console.log(arr);
                                arr = new Array()
                            }
                        } else {
                            if(helper && i < temp.length - 2) {
                                arr.push(temp.at(i))
                                temp2.push(arr);
                                //console.log(arr);
                                arr = new Array()
                            } else {
                                arr.push(temp.at(i))
                                temp2.push(arr);
                                arr = new Array()
                            }
                            if(i == temp.length - 2) {
                                arr.push(temp.at(i+1))
                                temp2.push(arr);
                                // console.log(arr);
                                arr = new Array()
                            }
                            helper = false;
                        }
                        i++;
                    }
                    setTransactions(temp2);
                    setIncome(tempIncome);
                    setExpense(tempExpense);
                    setBalance(income - expense);
                })
                .catch(err => console.log(err))
            }
        })
    })

    return (
        <div style={{ fontFamily:'Inter', textAlign:'center' }}>
            <Header/>
            {/* <button style={{ border:'none', backgroundColor:'inherit', marginRight:'10vh' }}>
                <MdOutlineKeyboardArrowLeft size={45}/>
            </button> */}
            <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="MMMM yyyy"
                customInput={<input id='datepickerInput' style={{ border:'none', textAlign:'center', fontSize:'1.3em', marginTop:'5vh', fontFamily:'Inter', cursor:'pointer'  }} />}
                showMonthYearPicker
            />
            <hr style={hr}></hr>
            {/* <button style={{ border:'none', backgroundColor:'inherit', marginLeft:'20vh' }}>
                <MdOutlineKeyboardArrowRight size={45}/>
            </button><br></br> */}
            <Container>
                <Row>
                    <Col>
                        <span>Income</span><br></br>
                        <span style={{ color:'#42B4E5' }}>{income}</span>
                    </Col>
                    <Col>
                        <span>Expense</span><br></br>
                        <span style={{ color:'#E55C5C' }}>{expense}</span>
                    </Col>
                    <Col>
                        <span>Balance</span><br></br>
                        <span>{balance}</span>
                    </Col>
                </Row>
            </Container>
            <hr style={hr}></hr>
            {transactions.length > 0 ? transactions.map(x => <DailyTransactions data={x}></DailyTransactions>) : <></>}
            <Button onClick={handleShow} variant='secondary' size='lg' style={{ position:'fixed', right:'2vw', bottom:'4vh' }}>
                <FaPlus
                    style={{ color:'white', fontSize:'1.25em' }}
                />
            </Button>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                <Modal.Title>Create Transaction</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form style={{ padding:'2vh 3vh' }}>
                        <ToggleButtonGroup style={{ marginLeft:'8vw' }} type="radio" name="options">
                            <ToggleButton onChange={(e) => setType(e.target.value)} variant='outline-dark' id="tbg-radio-1" value="income">
                            Income
                            </ToggleButton>
                            <ToggleButton onChange={(e) => setType(e.target.value)} variant='outline-dark' id="tbg-radio-2" value="expense">
                            Expense
                            </ToggleButton>
                        </ToggleButtonGroup><br></br>
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
                        <label style={{ margin: '2vh 0 1vh 0', fontSize:'1.1em' }}>Date </label><br></br>
                        <DatePicker 
                            selected={date} 
                            onChange={(date) => setDate(date)}
                            customInput={<input required style={{ borderRadius:'9px', width:'50vh', height:'5.5vh' }}/>}>
                        </DatePicker><br></br>
                        <label style={{ margin: '2vh 0 1vh 0', fontSize:'1.1em' }}>Category </label><br></br>
                        <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ borderRadius:'9px', width:'50vh', height:'5.5vh' }}>
                            {(type == "income") ? incomeCategories.map(x => <option value={x}>{x}</option>) : <option></option>}
                            {(type == "expense") ? expenseCategories.map(x => <option value={x}>{x}</option>) : <option></option>}
                        </select>
                        <Button 
                            style={{ margin:'4.5vh 0 2vh 4vw', width:'50vh', padding:'7px 10px' }} 
                            variant='dark'
                            onClick={handleSave}
                        >
                            Create
                        </Button>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Home;