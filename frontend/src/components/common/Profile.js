import { useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar2 from "./Navbar2"
import "./../css/components.css"
import { useState } from "react";
import axios, { Axios } from "axios";

const Profile = () => {
    const params = useParams();
    console.log(params);
    const location = useLocation();
    console.log(location);
    
    const details = location.state.data;
    const btstyle = {
        height: '30px',
        padding: '0px',
        width: '70px',
        margin:'3px'
    }
    const [age, setage] = useState(details.age);
    const [email, setemail] = useState(details.email);
    const [name, setname] = useState(details.name);
    const [phone, setphone] = useState(details.contact_number);
    const [password, setpass] = useState(details.password);
    const [batch, setbatch] = useState(details.batch);
    const navigate=useNavigate();
    const editbut = (item) => {
        var ele = document.getElementById(item);
        ele.disabled = false;
    }
    const savbut=(item)=>{
        var ele=document.getElementById(item);
        ele.disabled=true;
    }

    const submit_data= async()=>{
        const updated={
            name:name,
            email:email,
            password:password,
            contact_number:phone,
            age:age,
            batch:batch,
            actual:details.password,
            headers:{
                "accepts":"application/json"
            }
        }
        await axios.post("/user/update_user",updated).then(response => {
            alert("Update succesful\nPlease sign out and sign in to see the changes");
            navigate("/signin");

        })
        .catch(err=>{
            alert("update unsuccesful please try again later!");
        })

    }
    return (
        <div className="profile">
            <Navbar2 />
            <div className="header" >
                <img src={require('./../img/nou.png')} className='prof' />
                <h2>{details.name}</h2>
            </div>
            <ul className="details">
                <li className="name">
                    <h4>Name</h4>
                    <div className="edit">
                        <input type="text" id="name" name="name" disabled value={name} onChange={e => setname(e.target.value)} />
                        <div className="sne">
                            <buttton className='btn btn-danger' onClick={() => editbut('name')} style={btstyle} >edit</buttton>
                            <buttton className='btn btn-primary' onClick={() => savbut('name')} style={btstyle} >save</buttton>
                        </div>
                    </div>
                </li>
                <li className="email">
                    <h4>Email</h4>
                    <div className="edit">
                        <input type="text" id="email" name="email" disabled value={email} onChange={e => setemail(e.target.value)} />
                        <div className="sne">
                            
                        </div>
                    </div>
                </li>
                <li className="phone">
                    <h4>Phone number</h4>
                    <div className="edit">
                        <input type="text" id="phone" name="contact_number" disabled value={phone} onChange={e => setphone(e.target.value)} />
                        <div className="sne">
                            <buttton className='btn btn-danger' id='dphone' onClick={() => editbut('contact_number')} style={btstyle} >edit</buttton>
                            <buttton className='btn btn-primary' id='nphone' onClick={() => savbut('contact_number')} style={btstyle} >save</buttton>

                        </div>
                    </div>
                </li>
                <li className="batch">
                    <h4>Batch</h4>
                    <div className="edit">
                        <input type="text" id="batch" name="batch" disabled value={batch} onChange={e => setbatch(e.target.value)} />
                        <div className="sne">
                            <buttton className='btn btn-danger' id='dbatch' onClick={() => editbut('batch')} style={btstyle} >edit</buttton>
                            <buttton className='btn btn-primary' id='nbatch' onClick={() => savbut('batch')} style={btstyle} >save</buttton>

                        </div>
                    </div>
                </li>

                <li className="password">
                    <h4>Password</h4>
                    <div className="edit">
                        <input type="password" id="password" name="password" disabled value={password} onChange={e => setpass(e.target.value)} />
                        <div className="sne">
                            <buttton className='btn btn-danger' id='dpassword' onClick={() => editbut('password')} style={btstyle} >edit</buttton>
                            <buttton className='btn btn-primary' id='npassword' onClick={() => savbut('password')} style={btstyle} >save</buttton>
                        </div>
                    </div>
                </li>

                <li className="Age">
                    <h4>Age</h4>
                    <div className="edit">
                        <input type="number" id="age" name="age" disabled value={age} onChange={e => setage(e.target.value)} />
                        <div className="sne">
                            <buttton className='btn btn-danger' id='dage' onClick={() => editbut('age')} style={btstyle} >edit</buttton>
                            <buttton className='btn btn-primary' id='nage' onClick={() => savbut('age')} style={btstyle} >save</buttton>
                        </div>
                    </div>
                </li>
            </ul>
            <button className="btn btn-danger submitbut" style={{'margin':'auto'}} onClick={()=>submit_data()}>Save Changes</button>
        </div>

    )
}

export default Profile;