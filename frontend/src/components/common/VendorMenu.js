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
        const loadpost=async()=>{
            await axios.post("http://localhost:4000/user/vendoritems",{crossdomain:true,shop_name:details.shop_name}).then(response=>{
                console.log(response.data);
                for(var i=0;i<response.data.length;i++){
                    var ids=i+'_vendormenu_'+response.data[i].shop_name
                    console.log(ids);
                    row.push(<Edititem details={response.data[i]} itemid={ids} shop_name={response.data[i].shop_name}/>)
                }
                setcont(row);

            })
            .catch(err=>{
                console.log(err);
            })
            
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