import axios, { Axios } from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Items from "./Items";
import Navbar2 from "./Navbar2";
import Ordered from "./Ordered";


const Myorders=()=>{
    const location=useLocation();
    const details=location.state.data;
    const [content,setcont]=useState();
    const row=[];
    useEffect(  ()=>{
        const loadpost= async()=>{
            await axios.post('http://localhost:4000/user/myorders',{crossdomain:true,email:details.email}).then(response=>{
                const resp=response.data;
                for(var i=0;i<response.data.length;i++){
                    var ids=i+'_'+response.data[i].shop_name;
                    row.push(<Ordered order_id={response.data[i]._id} target={response.data[i].shop_name} canteen={response.data[i].shop_name} food={response.data[i].food} amount={response.data[i].cost} itemid={ids} quantity={response.data[i].quantity} status={response.data[i].status} time={response.data[i].Time}/>)
                    console.log(row);
                    //getitems(response.data[i].shop_name,response.data[i].food);
                    //row.push(<Items myorders={1} canteen={response.data[i].canteen} itemid={ids} name={response.data[i].food}  price={ans.price} rating={ans.rating} type={ans.type} item={ans.item}  addons={ans.add_ons}  data={location.state.data} pic={ans.pic}/>)
                }
                setcont(row)
            })
            .catch(err=>{
                console.log(err);
            })

        } 
        loadpost();
    },[]);
    return(
        <div className="myorders">
        <Navbar2 name={location.state.data.name} data={location.state.data}/>
        <h3>My orders</h3>
        <div className="conatainer orders">
            {content}
        </div>
        </div>
    )
}

export default Myorders;