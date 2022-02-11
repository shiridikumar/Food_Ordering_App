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
            await axios.post("/user/pending-orders",{ headers:{
                "accepts":"application/json"
            },crossdomain:true,shop_name:details.shop_name}).then(response=>{
                for(var i=0;i<response.data.length;i++){
                    var ids=i+'_'+response.data[i].shop_name;
                    row.push(<Ordered order_id={response.data[i]._id} target={response.data[i].email} canteen={response.data[i].shop_name} food={response.data[i].food} amount={response.data[i].cost} itemid={ids} quantity={response.data[i].quantity} status={response.data[i].status} time={response.data[i].Time} vendor_view={1} shop_name={details.shop_name}/>)
                }
                setcont(row);
            })

        }
        loadpost();

    },[])
    const details=location.state.data;


    return (
        <div className="vendor-dashboard">
            <Navbar2 name={details.shop_name} vendor_view={1} data={location.state.data}/>
            <h3>Orders Dashboard</h3>
            <div className="container pending-orders">
                {cont}
            </div>

        </div>

    )

}

export default VendorsDashboard