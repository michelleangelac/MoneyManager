import Header from "../components/Header";
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from 'react';
import { MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowLeft } from 'react-icons/md'
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../auth/firebase';
import { Container, Row, Col } from "react-bootstrap";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";

async function getData(user) {
    let docRef = doc(db, "Users", user.email);
    const docSnap = await getDoc(docRef);
    let data = docSnap.data();
    return data;
}

const Insights = () => {
    const [month, setMonth] = useState(new Date());
    let currentMonth = String(month).substring(4,7);
    let currentYear = String(month).substring(11,15);

    const [income, setIncome] = useState(0);
    const [expense, setExpense] = useState(0);
    
    const [incomePieData, setIncomePieData] = useState(new Array());
    const [expensePieData, setExpensePieData] = useState(new Array());
    const COLORS = ['#476088', '#567D89', '#FFC562', '#FF6D74', '#4FDDC3', '#61A8E8', '#FFE787'];
    const renderCustomizedLabel = ({
        percent
        }: any) => {

        return (
            `${(percent * 100).toFixed(0)}%`
        );
    };

    const handlePrevMonth = () => {
        const prevDate = month.getDate();
        let prevMonth = month.getMonth() - 1;
        let prevYear = month.getFullYear();
   
        if(prevMonth == -1) {
            prevYear--;
            prevMonth = 11;
        }
        setMonth(new Date(prevYear, prevMonth, prevDate))
    }

    const handleNextMonth = () => {
        const date = month.getDate();
        let nextMonth = month.getMonth() + 1;
        let nextYear = month.getFullYear();
   
        if(nextMonth == 12) {
            nextYear++;
            nextMonth = 0;
        }
        setMonth(new Date(nextYear, nextMonth, date))
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(user) {
                getData(user)
                .then(data => {
                    let userTransactions = data?.Transactions; 
                    let tempIncome = 0; let tempExpense = 0;
                    let incomeCategories = new Array(); let incomeAmounts = new Array();
                    let expenseCategories = new Array(); let expenseAmounts = new Array();
                    userTransactions.forEach(tr => {
                        const tDate = tr.Date
                        const tAmount = tr.Amount
                        const tCategory = tr.Category  
                        let month = String(new Date(tDate.seconds * 1000)).substring(4,7);
                        let year = String(new Date(tDate.seconds * 1000)).substring(11,15);
                        if(currentMonth == month && currentYear == year) {
                            if(tr.Type == "income") {
                                tempIncome += tAmount;
                                if(!incomeCategories.includes(tCategory)) {
                                    incomeCategories.push(tCategory)
                                    incomeAmounts.push(tAmount)
                                } else {
                                    let amt = incomeAmounts.at(incomeCategories.indexOf(tCategory))
                                    incomeAmounts.splice(incomeCategories.indexOf(tCategory), 1, amt + tAmount)
                                }
                            } else {
                                tempExpense += tAmount;
                                if(!expenseCategories.includes(tCategory)) {
                                    expenseCategories.push(tCategory)
                                    expenseAmounts.push(tAmount)
                                } else {
                                    let amt = expenseAmounts.at(expenseCategories.indexOf(tCategory))
                                    expenseAmounts.splice(expenseCategories.indexOf(tCategory), 1, amt + tAmount)
                                }
                            }
                        }
                    });

                    let incomeChartData = new Array(); let expenseChartData = new Array();
                    for(let i = 0; i < incomeCategories.length; i++) {
                        let temp = {
                            "name": incomeCategories.at(i),
                            "value": incomeAmounts.at(i)
                        }
                        incomeChartData.push(temp);
                    }
                    for(let i = 0; i < expenseCategories.length; i++) {
                        let temp = {
                            name: expenseCategories.at(i),
                            value: expenseAmounts.at(i)
                        }
                        expenseChartData.push(temp);
                    }

                    setIncome(tempIncome)
                    setExpense(tempExpense)
                    setIncomePieData(incomeChartData)
                    setExpensePieData(expenseChartData)
                })
            }
        })
    })

    return (
        <div style={{ fontFamily:'Inter' }}>
            <Header/>
            <div style={{ display:'flex', flexDirection:'row', margin:'2vh 0 4vh 5vw' }}>
                <button onClick={handlePrevMonth} style={{ border:'none', backgroundColor:'inherit', display:'block', marginRight:'0.5vw' }}>
                    <MdOutlineKeyboardArrowLeft size={40}/>
                </button>
                <DatePicker
                    selected={month}
                    onChange={(date) => setMonth(date)}
                    dateFormat="MMMM yyyy"
                    customInput={<input
                    style={{ display:'block', width:'15vw', border:'none', textAlign:'center', marginTop:'1vh', fontSize:'1.4em', fontFamily:'Inter', cursor:'pointer'  }} />}
                    showMonthYearPicker
                />
                <button onClick={handleNextMonth} style={{ border:'none', backgroundColor:'inherit', display:'block', marginLeft:'0.5vw' }}>
                    <MdOutlineKeyboardArrowRight size={40}/>
                </button>
            </div><br></br>
            <div style={{ textAlign:'center', fontSize:'1.2em' }}>
            <Container>
                <Row>
                    <Col>
                        <span>Income</span><br></br>
                        <span style={{ color:'#42B4E5' }}>{income}</span><br></br>
                        <PieChart width={600} height={375}>
                            <Pie data={incomePieData} dataKey="value" nameKey="name" outerRadius={120} label={renderCustomizedLabel}>
                                {incomePieData.map((entry, index) => <Cell key={'cell-${index}'} fill={COLORS[index % COLORS.length]}/>)}
                            </Pie>
                            <Legend 
                                payload={
                                    incomePieData.map(
                                    (item, index) => ({
                                        id: item.name,
                                        type: "square",
                                        value: ` ${item.name}: ${item.value}`,
                                        color: COLORS[index % COLORS.length]
                                    })
                                    )
                                }
                                layout="vertical" verticalAlign="middle" align="right" iconSize={25} />
                        </PieChart>
                    </Col>
                    <Col>
                        <span>Expense</span><br></br>
                        <span style={{ color:'#E55C5C' }}>{expense}</span>
                        <PieChart width={600} height={375}>
                            <Pie data={expensePieData} dataKey="value" nameKey="name" outerRadius={120} label={renderCustomizedLabel}>
                                {expensePieData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>)}
                            </Pie>
                            <Legend 
                                payload={
                                    expensePieData.map(
                                    (item, index) => ({
                                        id: item.name,
                                        type: "square",
                                        value: ` ${item.name}: ${item.value}`,
                                        color: COLORS[index % COLORS.length]
                                    })
                                    )
                                }
                            layout="vertical" verticalAlign="middle" align="right"  iconSize={25}/>
                        </PieChart><br></br>
                    </Col>
                </Row>
            </Container>
            </div>
        </div>
    )
}

export default Insights;