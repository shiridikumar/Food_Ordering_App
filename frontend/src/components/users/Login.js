import { useState, useEffect } from "react";
import Navbar from "../templates/Navbar";
import { Navigate, useNavigate } from "react-router-dom";

import axios, { Axios } from "axios";
import { Alert, Avatar, Button, FormControl, InputLabel, Link, MenuItem, Select, TextField } from "@mui/material";
import log from "../../log";



const Login = (props) => {
    const mystyle = {
        color: "white",
    }
    const navigate = useNavigate();
    const click = async () => {
        console.log(email);
        console.log(password)
        await axios.post("http://localhost:4000/user/login", { crossdomain: true, email: email, password: password }).then(response => {
            console.log(response.data);
            log.logged = 1;
            navigate("/",{state:{data:response.data}});
            //navigate("/");
        })
            .catch(error => {
                alert("Invlaid Email or password");
            })
    }
    const [email, setemail] = useState('');
    const [password, setpass] = useState('');

    return (
        <div className="signin">
            <h1>Sign in</h1>
            <div className="container login">
                <div className="form-floating mb-3">
                    <input type="email" className="form-control" id="user" value={email} placeholder="name@example.com" style={{ background: "none", color: "white" }} onChange={e => setemail(e.target.value)} />
                    <label htmlFor="user">Email address</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="password" className="form-control" id="pass" value={password} placeholder="name@example.com" style={{ background: "none", color: "white" }} onChange={e => setpass(e.target.value)} />
                    <label htmlFor="pass">password</label>
                </div>
                <button className="btn btn-danger" onClick={click}>submit</button>
                <a>new user? sign up</a>

            </div>
        </div>
    )
}

export default Login;