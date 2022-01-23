import { useNavigate } from "react-router-dom"
import "./../css/components.css"

const Navbar2 = (props) => {
    const navigate=useNavigate();
    const view_inventory=()=>{
        navigate("/vendormenu",{state:{data:props.data}})
    }
    return (
        <nav className="navbar navbar nav2" style={{"backgroundColor":"#d84f57"}}>
            <div className="container-fluid">
                <a className="navbar-brand">{props.name}</a>
                <div className="left" style={{"display":"flex","justifyContent":"flex-end"}}>
                    {!props.vendor_view?
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />:
                    <button className="btn btn-danger" id='vendormenu' onClick={()=>{view_inventory()}}>Food menu</button>
                    }
                    <button className="btn btn-light" type="submit">Search</button>
                </div>
            </div>
        </nav>
    )

}

export default Navbar2;