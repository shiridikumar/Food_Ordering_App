import { useNavigate } from "react-router-dom"
import "./../css/components.css"

const Navbar2 = (props) => {
    const navigate=useNavigate();
    const view_inventory=()=>{
        navigate("/vendormenu",{state:{data:props.data}})
    }
    const signout=()=>{
        navigate("/signin");
    }

    const back=()=>{
        navigate(-1);
    }
    return (
        <nav className="navbar navbar nav2" style={{"backgroundColor":"#d84f57"}}>
            <div className="container-fluid">
                <a className="navbar-brand">{props.name}</a>
                <div className="left" style={{"display":"flex","justifyContent":"flex-end"}}>
                    {props.vendor_view &&
                    <button className="btn btn-danger" id='vendormenu' onClick={()=>{view_inventory()}}>Food menu</button>
                    }
                    <button className="btn btn-danger" onClick={()=>{back()}} >Back</button>
                    <button className="btn btn-danger" onClick={()=>{signout()}} >Sign out</button>
                </div>
            </div>
        </nav>
    )

}

export default Navbar2;