import { useLocation } from "react-router-dom";
import Navbar2 from "./Navbar2";


const Myorders=()=>{
    const location=useLocation();
    return(
        <Navbar2 name={location.state.data.name}/>
    )
}

export default Myorders;