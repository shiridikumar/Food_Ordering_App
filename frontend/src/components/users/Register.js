import { useState, useEffect } from "react";
import Navbar from "../templates/Navbar";
import { Navigate, useNavigate } from "react-router-dom";
import axios, { Axios } from "axios";
import { Alert, Avatar, Button, FormControl, InputLabel, Link, makeStyles, MenuItem, Select, TextField } from "@mui/material";
import log from "../../log";



const Register = (props) => {
    const [rname, setname] = useState("");
    const [remail, setemail] = useState("");
    const [batch, setbatch] = useState("Batch");
    const [age, setage] = useState();
    const [contact_number, setcontact] = useState();
    const [rpassword, setpass] = useState();
    const [usertype, settype] = useState("Buyer");
    const [shop_name,setshop]=useState("");
    const navigate=useNavigate();
    const [shr,setshr]=useState();
    const [smin,setsmin]=useState();
    const [ehr,setehr]=useState();
    const [emin,setemin]=useState();

    const [shrcont,setshrcont]=useState();
    const [smincont,setsmincont]=useState();
    const [ehrcont,setehrcont]=useState();
    const [emincont,setemincont]=useState();


    /*const [namefloat, setfname] = useState("Enter name");
    const [emailfloat, setfemail] = useState("Enter email");
    const [agefloat, setfage] = useState();
    const [contact_number_float,setfcontact] = useState();
    const [passwordfloat, setfpass] = useState();*/
    const shrarr=[],ehrarr=[],sminarr=[],eminarr=[]
    useEffect(()=>{
        for(var i=0;i<24;i++){
            shrarr.push(<li><a className="dropdown-item" id={'sh'+String(i).padStart(2, '0')} onClick={(e) => {setshr(e.target.id.slice(2))}} >{String(i).padStart(2, '0')}</a></li>)
            ehrarr.push(<li><a className="dropdown-item"  id={'em'+String(i).padStart(2, '0')} onClick={(e) => {setehr(e.target.id.slice(2))}} >{String(i).padStart(2, '0')}</a></li>)
        }
        for(var i=0;i<60;i++){
            sminarr.push(<li><a className="dropdown-item" id={'sm'+String(i).padStart(2, '0')} onClick={(e) => {setsmin(e.target.id.slice(2))}} >{String(i).padStart(2, '0')}</a></li>)
            eminarr.push(<li><a className="dropdown-item" id={'em'+String(i).padStart(2, '0')} onClick={(e) => {setemin(e.target.id.slice(2))}} >{String(i).padStart(2, '0')}</a></li>)
        }
        setshrcont(shrarr);
        setehrcont(ehrarr);
        setsmincont(sminarr);
        setemincont(eminarr);
    },[])


    const buyer = () => {
        settype("Buyer");
    }

    const vendor = () => {
        settype("Vendor");
    }

    const selectbatch = (batch) => {
        setbatch(batch);
    }

    const submit = async() => {
        if(usertype=='Buyer'){
            if(batch=='Batch'){
                setbatch('UG1');
            }
            const details={
                name:rname,
                email:remail,
                batch:batch,
                age:age,
                contact_number:contact_number,
                password:rpassword
            }
            console.log(details);
            await axios.post("http://localhost:4000/user/userregister",details).then(response=>{
               
            })

        }
        if(usertype=='Vendor'){
            const details={
                manager_name:rname,
                shop_name:shop_name,
                email:remail,
                password:rpassword,
                phone:contact_number,
                starttime:shr+':'+smin+':'+'00',
                endtime:ehr+':'+emin+':'+'00'
            }
            await axios.post("http://localhost:4000/user/vendorregister",details).then(response=>{
               
            })
        }
        

    }
    return (
        <div className="signin signup">
            <h1>Sign up</h1>
            {usertype === 'Buyer' ?
                <div className="container login register">
                    <div className="form-floating mb-3" style={{ "width": "100%" }}>
                        <input type="text" className="form-control" id="userid" value={rname} placeholder="name" style={{ background: "none", color: "white" }} name="name" autoComplete="off" onChange={e => setname(e.target.value)} />
                        <label htmlFor="userid">Enter name</label>
                    </div>

                    <div className="form-floating mb-3" style={{ "width": "100%" }}>
                        <input type="email" className="form-control" id="email" value={remail} placeholder="name@example.com" style={{ background: "none", color: "white" }} onChange={(e) => setemail(e.target.value)} />
                        <label htmlFor="email">Enter Email id</label>
                    </div>

                    <div className="age-phone">
                        <div className="form-floating mb-3" style={{ "width": "100%" }}>
                            <input type="number" className="form-control" id="Age" value={age} placeholder="name@" style={{ background: "none", color: "white" }} onChange={e => setage(e.target.value)} />
                            <label htmlFor="Age">Enter your age</label>
                        </div>
                        <div className="form-floating mb-3" style={{ "width": "100%" }}>
                            <input type="number" className="form-control" id="phone" value={contact_number} placeholder="name@" style={{ background: "none", color: "white" }} onChange={e => setcontact(e.target.value)} />
                            <label htmlFor="phone">Enter contact number</label>
                        </div>
                    </div>
                    <div className="form-floating mb-3" style={{ "width": "100%" }}>
                        <input type="password" className="form-control" id="passcode" value={rpassword} placeholder="name@" name="foo" autoComplete="new-password" style={{ background: "none", color: "white" }} onChange={e => setpass(e.target.value)} />
                        <label htmlFor="passcode">Enter a password</label>
                    </div>
                    <button type="button" className="btn btn-outline dropdown-toggle batch" data-bs-toggle="dropdown" aria-expanded="false" id='userbatchbut' style={{ "background": "none" }}>
                        {batch}
                    </button>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" onClick={(e) => {selectbatch("UG1")}} >UG1</a></li>
                        <li><a className="dropdown-item" onClick={() =>{ selectbatch("UG2")}} >UG2</a></li>
                        <li><a className="dropdown-item" onClick={() => {selectbatch("UG3")}} >UG3</a></li>
                        <li><a className="dropdown-item" onClick={() => {selectbatch("UG4")}} >UG4</a></li>
                        <li><a className="dropdown-item" onClick={() => {selectbatch("UG5")}}>UG5</a></li>
                    </ul>
                    <button className="btn btn-danger" onClick={()=>{submit()}}>submit</button>

                    <a onClick={()=>{navigate("/signin")}}>Already have an account? sign in</a>
                    <div className="btn-group" style={{ "width": "120px" }}>
                        <button type="button" className="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" id='usertypebut'>
                            {usertype}
                        </button>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" onClick={() => buyer()} >Buyer</a></li>
                            <li><a className="dropdown-item" onClick={() => { vendor() }}>Vendor</a></li>
                        </ul>
                    </div>
                </div> :
                <div className="container login register">
                    <div className="form-floating mb-3" style={{ "width": "100%" }}>
                        <input type="text" className="form-control" id="userid" value={rname} placeholder="name" style={{ background: "none", color: "white" }} name="name" autoComplete="off" onChange={e => setname(e.target.value)} />
                        <label htmlFor="userid">Enter Manager name</label>
                    </div>
                    <div className="form-floating mb-3" style={{ "width": "100%" }}>
                        <input type="email" className="form-control" id="email" value={remail} placeholder="name@example.com" style={{ background: "none", color: "white" }} onChange={e => setemail(e.target.value)} />
                        <label htmlFor="email">Enter Email id</label>
                    </div>
                    <div className="form-floating mb-3" style={{ "width": "100%" }}>
                        <input type="text" className="form-control" id="shop_name" value={shop_name} placeholder="name@example.com" style={{ background: "none", color: "white" }} onChange={e => setshop(e.target.value)} />
                        <label htmlFor="shop_name">Enter shop name</label>
                    </div>
                    <div className="form-floating mb-3" style={{ "width": "100%" }}>
                            <input type="number" className="form-control" id="phone" value={contact_number} placeholder="name@" style={{ background: "none", color: "white" }} onChange={e => setcontact(e.target.value)} />
                            <label htmlFor="phone">Enter contact number</label>
                    </div>
                    <div className="start">
                    <h6>Opening Time</h6>
                        <button type="button" className="btn btn-outline dropdown-toggle starthrs" data-bs-toggle="dropdown" aria-expanded="false" id='starthrs' style={{ "background": "none" }}>
                            {shr}
                        </button>
                        <ul className="dropdown-menu">
                            {shrcont}
                        </ul>
                        <button type="button" className="btn btn-outline dropdown-toggle startmins" data-bs-toggle="dropdown" aria-expanded="false" id='startmins' style={{ "background": "none" }}>
                            {smin}
                        </button>
                        <ul className="dropdown-menu">
                            {smincont}
                        </ul>

                    </div>

                    <div className="end">
                        <h6>Closing Time</h6>
                        <button type="button" className="btn btn-outline dropdown-toggle endhrs" data-bs-toggle="dropdown" aria-expanded="false" id='endhrs' style={{ "background": "none" }}>
                            {ehr}
                        </button>
                        <ul className="dropdown-menu">
                            {ehrcont}
                        </ul>
                        <button type="button" className="btn btn-outline dropdown-toggle startmins" data-bs-toggle="dropdown" aria-expanded="false" id='startmins' style={{ "background": "none" }}>
                            {emin}
                        </button>
                        <ul className="dropdown-menu">
                            {emincont}
                        </ul>

                    </div>

                    <div className="form-floating mb-3" style={{ "width": "100%" }}>
                        <input type="password" className="form-control" id="passcode" value={rpassword} placeholder="name@" name="foo" autoComplete="new-password" style={{ background: "none", color: "white" }} onChange={e => setpass(e.target.value)} />
                        <label htmlFor="passcode">Enter a password</label>
                    </div>
                    <button className="btn btn-danger" onClick={()=>{submit()}}>submit</button>

                    <a onClick={()=>{navigate("/signin")}}>Already have an account? sign in</a>
                    <div className="btn-group" style={{ "width": "120px" }}>
                        <button type="button" className="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" id='usertypebut'>
                            {usertype}
                        </button>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" onClick={() => buyer()} >Buyer</a></li>
                            <li><a className="dropdown-item" onClick={() => { vendor() }}>Vendor</a></li>
                        </ul>
                    </div>
                </div>


            }

        </div>

    )
};

export default Register;