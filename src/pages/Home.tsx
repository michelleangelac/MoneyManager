import CSS from 'csstype';
import Header from '../components/Header';

const container: CSS.Properties = {
    width: '100%'
}

function Home() {
    return (
        <div style={container}>
            <Header/>
            <h1>Home</h1>
        </div>
    )
}

export default Home;