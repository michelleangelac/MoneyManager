import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import { Routes, Route } from 'react-router-dom'

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword";
import Home from './pages/Home';
import Goals from './pages/Goals';
import Profile from './pages/Profile';

function App() {
  return (
    <Routes>
        <Route path="/" Component={Login}></Route>
        <Route path="/signup" Component={Signup}></Route>
        <Route path="/resetpassword" Component={ResetPassword}></Route>
        <Route path="/home" Component={Home}></Route>
        <Route path="/goals" Component={Goals}></Route>
        <Route path="/profile" Component={Profile}></Route>
    </Routes>
  )
}

export default App;