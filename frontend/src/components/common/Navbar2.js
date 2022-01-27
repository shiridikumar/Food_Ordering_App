import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import "./../css/components.css"

const Navbar2 = (props) => {
    const navigate = useNavigate();
    console.log(props.data);
    var details=props.data;
    const [wallet, setwallet] = useState();
    const [addamount, setadd] = useState(0);
    useEffect(() => {
        const loadpost = async () => {
            if (!props.vendor_view) {
                await axios.post("http://localhost:4000/user/userdetails", { email: props.data.email }).then(response => {
                    details = response.data;
                    console.log("helllllo");
                    setwallet(response.data.wallet);

                })
            }
        }
        loadpost();
    }, [])
    
    const addwallet = async () => {
        if (addamount <= 0) {
            alert("please enter a valid amount(>0)");
        }
        else {
            await axios.post("http://localhost:4000/user/addwallet", { crossdomain: true, wallet: addamount, actual: wallet, email:details.email }).then(response => {
                window.location.reload();
            })
        }

    }
    const view_inventory = () => {
        navigate("/vendormenu", { state: { data:details } })
    }
    const signout = () => {
        navigate("/signin");
    }

    const view_orders=()=>{
        navigate("/Vendors",{state:{data:details}});
    }

    const back = () => {
        navigate(-1);
    }
    const view_stats=()=>{
        navigate("/stats",{state:{data:details}})
    }
    return (
        <nav className="navbar navbar nav2" style={{ "backgroundColor": "#d84f57" }}>
            <div className="container-fluid">
                <a className="navbar-brand">{props.name}</a>
                <div className="left" style={{ "display": "flex", "justifyContent": "flex-end" }}>
                    {props.vendor_view &&
                    <>
                        <button className="btn btn-danger" id='vendorstatistics' onClick={()=>{view_stats()}}>Statictics</button>
                        <button className="btn btn-danger" id='vendorstatistics' onClick={()=>{view_orders()}}>Orders Dashboard</button>
                        <button className="btn btn-danger" id='vendormenu' onClick={() => { view_inventory() }}>Food menu</button>
                        <button className="btn btn-danger" id='vendorprofile' onClick={()=>{navigate("/Vendorprofile",{state:{data:details}})}} >Profile</button>
                        </>
                    }
                    {!props.vendor_view &&
                        <>
                            <button type="button" className="btn" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ "color": "white" }}>
                                <i className="fas fa-money-bill-wave"></i>  Wallet : {wallet}
                            </button>
                            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel">Wallet amount details</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

                                        </div>
                                        <div className="modal-body">
                                            <div className="wal">
                                                <h2>Current Wallet amount : {wallet}</h2>
                                                <div className="addamount">
                                                    <input type="number" value={addamount} onChange={(e) => { setadd(e.target.value) }} placeholder="Add amount" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            <button type="button" className="btn btn-primary" onClick={() => { addwallet() }}>Add amount</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    }
                    <button className="btn btn-danger" onClick={() => { back() }} >Back</button>
                    <button className="btn btn-danger" onClick={() => { signout() }} >Sign out</button>
                </div>
            </div>
        </nav>
    )

}

export default Navbar2;