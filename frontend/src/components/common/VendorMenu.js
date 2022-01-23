import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Edititem from "./Edititem";
import Navbar2 from "./Navbar2";

const VendorMenu=()=>{
    const location=useLocation();
    const navigate=useNavigate();
    const details=location.state.data;
    console.log(details);
    const row=[];
    const [cont,setcont]=useState();
    useEffect(()=>{
        const loadpost=()=>{
            for(var i=0;i<details.items.length;i++){
                var ids=i+'_vendormenu_'+details.shop_name
                row.push(<Edititem details={details.items[i]} itemid={ids}/>)
            }
            setcont(row);

        }

        loadpost();

    },[])
    return (
        <div className="vendor-menu">
            <Navbar2 name={details.shop_name} vendor_view={1} data={details}/>
            <h3>Food-Menu</h3>
            <div className="container pending-orders">
                {cont}
            </div>
        </div>
    )
}

export default VendorMenu;