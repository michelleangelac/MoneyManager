import Login from "./pages/Login";
import { Routes, Route } from 'react-router-dom'
import Signup from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" Component={Login}></Route>
        <Route path="/signup" Component={Signup}></Route>
        <Route path="/resetpassword" Component={ResetPassword}></Route>
      </Routes>
    </>
  )
}

export default App;