import CSS from 'csstype';
import Header from '../components/Header';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa'
import { MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowLeft } from 'react-icons/md'
import { Button, Container, Row, Col } from 'react-bootstrap';

const hr: CSS.Properties = {
    color:'#899499'
}

const Home = () => {
    const [startDate, setStartDate] = useState(new Date());

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
                customInput={<input id='datepickerInput' style={{ border:'none', textAlign:'center', fontSize:'1.3em', marginTop:'5vh', fontFamily:'Inter'  }} />}
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
                        <span style={{ color:'#42B4E5' }}>$100</span>
                    </Col>
                    <Col>
                        <span>Expense</span><br></br>
                        <span style={{ color:'#E55C5C' }}>$100</span>
                    </Col>
                    <Col>
                        <span>Balance</span><br></br>
                        <span>$100</span>
                    </Col>
                </Row>
            </Container>
            <hr style={hr}></hr>
            <Button variant='secondary' size='lg' style={{ position:'absolute', right:'2vw', bottom:'4vh' }}>
                <FaPlus
                    style={{ color:'white', fontSize:'1.25em' }}
                />
            </Button>
        </div>
    )
}

export default Home;