import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar2 from "./Navbar2"
import "./../css/components.css"
import { useEffect, useState } from "react";
import axios, { Axios } from "axios";

const Vendorprofile = () => {
    const params = useParams();
    console.log(params);
    const location = useLocation();
    console.log(location);

    const details = location.state.data;
    const btstyle = {
        height: '30px',
        padding: '0px',
        width: '70px',
        margin: '3px'
    }
    const [age, setage] = useState();
    const [email, setemail] = useState(details.email);
    const [name, setname] = useState(details.manager_name);
    const [phone, setphone] = useState(details.phone);
    const [password, setpass] = useState(details.password);
    const [batch, setbatch] = useState(details.shop_name);

    const [shr, setshr] = useState(details.starttime.slice(0, 2));
    const [smin, setsmin] = useState(details.starttime.slice(3, 5));
    const [ehr, setehr] = useState(details.endtime.slice(0, 2));
    const [emin, setemin] = useState(details.endtime.slice(3, 5));

    const [shrcont, setshrcont] = useState();
    const [smincont, setsmincont] = useState();
    const [ehrcont, setehrcont] = useState();
    const [emincont, setemincont] = useState();
    const [pic,setpic]=useState(details.pic);
    const [cont, setcont] = useState();

    const editbut = (item) => {
        var ele = document.getElementById(item);
        ele.disabled = false;
    }
    const savbut = (item) => {
        var ele = document.getElementById(item);
        ele.disabled = true;
    }

    const shrarr = [], ehrarr = [], sminarr = [], eminarr = []
    const [updatebar, setupdatebar] = useState();
    const navigate=useNavigate();
    const [vis, setvis] = useState(0);
    const upd = []
    useEffect(() => {
        const loadpost=()=>{
        axios.post("http://localhost:4000/user/canteen",{canteen:details.shop_name}).then(response=>{
            setpic(response.data.pic);
        })
    }
    loadpost();
        for (var i = 0; i < 24; i++) {
            shrarr.push(<li><a className="dropdown-item" id={'sh' + String(i).padStart(2, '0')} onClick={(e) => { setshr(e.target.id.slice(2)) }} >{String(i).padStart(2, '0')}</a></li>)
            ehrarr.push(<li><a className="dropdown-item" id={'em' + String(i).padStart(2, '0')} onClick={(e) => { setehr(e.target.id.slice(2)) }} >{String(i).padStart(2, '0')}</a></li>)
        }
        for (var i = 0; i < 60; i++) {
            sminarr.push(<li><a className="dropdown-item" id={'sm' + String(i).padStart(2, '0')} onClick={(e) => { setsmin(e.target.id.slice(2)) }} >{String(i).padStart(2, '0')}</a></li>)
            eminarr.push(<li><a className="dropdown-item" id={'em' + String(i).padStart(2, '0')} onClick={(e) => { setemin(e.target.id.slice(2)) }} >{String(i).padStart(2, '0')}</a></li>)
        }
        setshrcont(shrarr);
        setehrcont(ehrarr);
        setsmincont(sminarr);
        setemincont(eminarr);

        upd.push(<div className="input-group mb-3">
            <form action={`http://localhost:4000/user/uploadpic?shop_name=${details.shop_name}&item=${details.shop_name}`} enctype="multipart/form-data" method="POST" style={{"display":"inline-flex"}}   >
                <input type="file" className="form-control" id="vendorprofile" name="pic" style={{"display":"inline"}} />
                <input type="submit" value="Upload" className="btn btn-secondary" style={{"display":"inline"}}/>
            </form>
        </div>)
        setupdatebar(upd)
    }, [])



    const submit_data = async () => {
        const starttime = shr + ':' + smin + ':00';
        const endtime = ehr + ':' + emin + ':' + '00';

        const updated = {
            manager_name: name,
            email: email,
            password: password,
            phone: phone,
            shop_name: batch,
            actual: details.password,
            starttime: starttime,
            endtime: endtime

        }
        await axios.post("http://localhost:4000/user/update_vendor", updated).then(response => {
            alert("Update succesful\nPlease sign out and sign in to see the changes");
            navigate("/signin");
        })
            .catch(err => {
                alert("update unsuccesful please try again later!");
            })

    }
    return (
        <div className="profile">
            <Navbar2 vendor_view={1} data={details} />
            <div className="header" >
                <img src={require('./../images/' +pic)} className='prof' />
                <button className="btn btn-danger" onClick={() => setcont(updatebar)} id='updatepicvendor'>Update photo</button>
                {cont}
                <h2>{details.shop_name}</h2>
            </div>
            <ul className="details">
                <li className="name">
                    <h4>Manager Name</h4>
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
                    <h4>Canteen</h4>
                    <div className="edit">
                        <input type="text" id="batch" name="batch" disabled value={batch} onChange={e => setbatch(e.target.value)} />
                        <div className="sne">

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

                <div className="start">
                    <h6>Opening Time</h6>
                    <button type="button" className="btn btn-outline dropdown-toggle starthrs" data-bs-toggle="dropdown" aria-expanded="false" id='starthrs' >
                        {shr}
                    </button>
                    <ul className="dropdown-menu" style={{ "height": "100px", "overflowY": "scroll", "background": "white", "padding": "0px" }}>
                        {shrcont}
                    </ul>
                    <button type="button" className="btn btn-outline dropdown-toggle startmins" data-bs-toggle="dropdown" aria-expanded="false" id='startmins' >
                        {smin}
                    </button>
                    <ul className="dropdown-menu" style={{ "height": "100px", "overflowY": "scroll", "background": "white", "padding": "0px" }}>
                        {smincont}
                    </ul>
                </div>


                <div className="end">
                    <h6>Closing Time</h6>
                    <button type="button" className="btn btn-outline dropdown-toggle endhrs" data-bs-toggle="dropdown" aria-expanded="false" id='endhrs' style={{ "background": "none" }}>
                        {ehr}
                    </button>
                    <ul className="dropdown-menu" style={{ "height": "100px", "overflowY": "scroll", "background": "white", "padding": "0px" }}>
                        {ehrcont}
                    </ul>
                    <button type="button" className="btn btn-outline dropdown-toggle startmins" data-bs-toggle="dropdown" aria-expanded="false" id='startmins' style={{ "background": "none" }}>
                        {emin}
                    </button>
                    <ul className="dropdown-menu" style={{ "height": "100px", "overflowY": "scroll", "background": "white", "padding": "0px" }}>
                        {emincont}
                    </ul>

                </div>



            </ul>
            <button className="btn btn-danger submitbut" style={{ 'margin': 'auto' }} onClick={() => submit_data()}>Save Changes</button>
        </div>

    )
}

export default Vendorprofile;