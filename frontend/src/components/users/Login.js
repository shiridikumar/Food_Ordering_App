import { useState, useEffect } from "react";
import Navbar from "../templates/Navbar";
import { Navigate, useNavigate } from "react-router-dom";

import axios, { Axios } from "axios";
import { Alert, Avatar, Button, FormControl, InputLabel, Link, makeStyles, MenuItem, Select, TextField } from "@mui/material";
import log from "../../log";




const Login = (props) => {
    const mystyle = {
        color: "white",
    }
    const navigate = useNavigate();
    const [logintype, settype] = useState(0);

    const click = async () => {
        console.log(email);
        console.log(password)

        if(logintype==1){

            await axios.post("http://localhost:4000/user/login", { crossdomain: true, email: email, password: password }).then(response => {
                console.log(response.data);
                log.logged = 1;
                navigate("/", { state: { data: response.data } });
            })
            .catch(error => {
                alert("Invlaid Email or password");
            })
        }
        else if(logintype==2){
            await axios.post("http://localhost:4000/user/vendorlogin", { crossdomain: true, email: email, password: password }).then(response => {
                console.log(response.data);
                log.logged = 1;
                navigate("/vendors",{state:{data:response.data,logged:1}});
            })
            .catch(error => {
                alert("Invlaid Email or password");
            })
        }
        else{
            alert("Plese Select a usertype")
        }
    }
    const [email, setemail] = useState('');
    const [password, setpass] = useState('');

    const buyer = () => {
        settype(1);
        var ele = document.getElementById('usertypebut');
        ele.innerHTML = 'Buyer'

    }
    const vendor = () => {
        settype(2);
        var ele = document.getElementById('usertypebut');
        ele.innerHTML = 'Vendor'

    }

    return (
        <div className="signin">
            <h1>Sign in</h1>
            <div className="container login">
                <div className="form-floating mb-3" style={{ "width": "100%" }}>
                    <input type="email" className="form-control" id="user" value={email} placeholder="name@example.com" style={{ background: "none", color: "white" }} onChange={e => setemail(e.target.value)} />
                    <label htmlFor="user">Email address</label>
                </div>
                <div className="form-floating mb-3" style={{ "width": "100%" }}>
                    <input type="password" className="form-control" id="pass" value={password} placeholder="name@example.com" style={{ background: "none", color: "white" }} onChange={e => setpass(e.target.value)} />
                    <label htmlFor="pass">password</label>
                </div>
                <button className="btn btn-danger" onClick={click}>submit</button>
                <a>new user? sign up</a>
                <div className="btn-group" style={{ "width": "120px" }}>
                    <button type="button" className="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" id='usertypebut'>
                        UserType
                    </button>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" onClick={() => { buyer() }} >Buyer</a></li>
                        <li><a className="dropdown-item" onClick={() => { vendor() }}>Vendor</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Login;