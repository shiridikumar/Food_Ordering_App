import { BrowserRouter, Routes, Route, Outlet, Navigate, useNavigate } from "react-router-dom";
import "./App.css";

import UsersList from "./components/users/UsersList";
import Home from "./components/common/Home";
import Register from "./components/common/Register";
import Navbar from "./components/templates/Navbar";
import Profile from "./components/users/Profile";
import axios from "axios"
import Paper from "@mui/material/Paper";
import Login from "./components/users/Login";
import Gallery from "./components/common/Gallery";
import { useEffect } from "react";
import log from "./log";
const Layout = (props) => {
  const navigate = useNavigate();
    if (log.logged === 0) {
      console.log("asdaaaa");
      return (
        <Login />
      )
    }
    else {
      return (
        <div className="homepage">
          <div className="navdiv continer">
            <Navbar />
          </div>
          <div className="container">
            <Outlet />
          </div>
        </div>
      )
    }
  }


  const App = () => {
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/signin" element={<Login logged={0} />} />
            <Route path="/" element={<Layout/>}>
              <Route path="/" element={<Home/>}/>
              <Route path="/home" element={<Home />} />
              <Route path="users" element={<UsersList />} />
              <Route path="/register" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </>
    );
  }

  export default App;

