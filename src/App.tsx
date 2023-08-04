import { Routes, Route } from 'react-router-dom'
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword";
import Home from './pages/Home';
import Savings from './pages/Savings';
import Insights from './pages/Insights';
import Profile from './pages/Profile';

function App() {
  return (
    <Routes>
        <Route path="/" Component={Login}></Route>
        <Route path="/signup" Component={Signup}></Route>
        <Route path="/resetpassword" Component={ResetPassword}></Route>
        <Route path="/home" Component={Home}></Route>
        <Route path="/savings" Component={Savings}></Route>
        <Route path="/insights" Component={Insights}></Route>
        <Route path="/profile" Component={Profile}></Route>
    </Routes>
  )
}

export default App;