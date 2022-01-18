import { useState, useEffect } from "react";
import Navbar from "../templates/Navbar";
import { Navigate, useNavigate } from "react-router-dom";

import axios, { Axios } from "axios";
import { Avatar, Button, FormControl, InputLabel, Link, MenuItem, Select, TextField } from "@mui/material";
import log from "../../log";



const Login = (props) => {
    const mystyle = {
        color: "white",
    }
    const navigate=useNavigate();

    return (
        <div className="signin">
            <h1>Sign in</h1>
            <div className="container login">
                <div className="form-floating mb-3">
                    <input type="email" className="form-control" id="user" placeholder="name@example.com" style={{ background: "none",color:"white" }} />
                    <label htmlFor="user">Email address</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="password" className="form-control" id="pass" placeholder="name@example.com" style={{ background: "none" ,color:"white"}} />
                    <label htmlFor="pass">password</label>
                </div>
                <button className="btn btn-danger" onClick={()=>{navigate("/");log.logged=1}}>submit</button>
                <a>new user? sign up</a>

            </div>
        </div>
    )
}

export default Login;