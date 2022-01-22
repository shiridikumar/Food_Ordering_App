import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom"
import Navbar2 from "./Navbar2";
import Ordered from "./Ordered";

const VendorsDashboard=()=>{
    const location=useLocation();
    const navigate=useNavigate();
    const [cont,setcont]=useState();
    const row=[]
    useEffect(()=>{
        if(!location.state){
            navigate("/signin");
        }
        const loadpost= async()=>{
            await axios.post("http://localhost:4000/user/pending-orders",{crossdomain:true,shop_name:details.shop_name}).then(response=>{
                console.log(response.data);
                for(var i=0;i<response.data.length;i++){
                    var ids=i+'_'+response.data[i].shop_name;
                    row.push(<Ordered target={response.data[i].email} canteen={response.data[i].shop_name} food={response.data[i].food} amount={response.data[i].cost} itemid={ids} quantity={response.data[i].quantity} status={response.data[i].status} time={response.data[i].Time} vendor_view={1}/>)
                }
                setcont(row);
            })

        }
        loadpost();

    },[])
    const details=location.state.data;


    return (
        <div className="vendor-dashboard">
            <Navbar2 name={details.shop_name}/>
            <h3>Pending Orders</h3>
            <div className="container pending-orders">
                {cont}
            </div>

        </div>

    )

}

export default VendorsDashboard