import { Chip, Rating } from "@mui/material";
import axios, { Axios } from "axios";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./../css/components.css"





const Ordered = (props) => {

    const [name, setname] = useState();
    const [pic, setpic] = useState('no.png');
    const [item, setitem] = useState();
    const [type, settype] = useState();
    const [visible,setvis]=useState(1);
    const [rating, setrat] = useState();
    useEffect(() => {


        const getitems = async (shop_name, food) => {
            await axios.post('http://localhost:4000/user/itemdetails', { crossdomain: true, item: food, canteen: shop_name }).then(resp => {
                setname(resp.data.name);
                setpic(resp.data.pic);
                setitem(resp.data.item);
                settype(resp.data.type);
                setrat(resp.data.rating);
            });
        }
        getitems(props.canteen,props.food);
        if(props.status==='Rejected' || props.status==='Completed'){
            setvis(0);
        }
    },[])
    console.log(pic,type,rating,name,item);
    var dateObj = new Date(props.time);
    var month = dateObj.getMonth() + 1; //months from 1-12
    var day = dateObj.getDate();
    var year = dateObj.getFullYear();
    var hrs= dateObj.getHours();
    var mins=dateObj.getMinutes();
    const ntime=hrs+':'+mins;
    const ndate = day + "/" + month + "/" + year;

    const colorcodes={
        "Placed":'#dc3545',
        "Accepted":'#0d6efd',
        "Cooking":'#ffc107',
        "Ready for Pickup":'#0dcaf0',
        "Completed":"#198754",
        "Rejected":"#212529"
    }


    const [col_code,setcol]=useState(colorcodes[props.status]);
    const movestage= async()=>{
        await axios.post("http://localhost:4000/user/movestage",{crossdomain:true,orderid:props.order_id}).then(response=>{
            console.log(response);
            var ele=document.getElementById(props.order_id);
            console.log(ele);
            //ele.setAttribute('className',response.data);
            ele.innerHTML=response.data;
            setcol(colorcodes[response.data]);
            if(response.data==='Completed' || response.data==='Rejected'){
                setvis(0);
            }
        })
    }
    return (
        <div className="card" id={props.itemid}>
            <div className="card-body">
                <div className="pic">
                    <img src={require('./../img/' + pic)} />
                    <button className='btn' id={props.order_id}  style={{"fontWeight":"normal","color":"white","backgroundColor":col_code}}>{props.status}</button>
        
                </div>
                <div className="description">
                    <h6 style={{"fontWeight":"bold"}}>{props.food}</h6>
                    <ul>
                        {!props.vendor_view?
                        <li>Vendor : {props.target}</li>:
                        <li>Buyer Email : {props.target}</li>
                        }
                        <li>Tags : <Chip label={type} href="#basic-chip" />  <Chip label={item} href="#basic-chip" /> </li>
                        {!props.vendor_view &&
                        <div className="rating" style={{ "display": "flex", "marginTop": "5px" }}>
                            <h6 style={{ "display": "inline", "fontWeight": "normal" }}>Rating :</h6><Rating name="read-only" value={4.5} readOnly precision={0.1} />
                        </div>
                        }
                        <li>Quantity : {props.quantity} </li>
                        <li>Ordered Time : {ntime} </li>
                        <li>Ordered Date : {ndate}</li>
                        <li style={{"fontWeight":"bold"}}>Bill amount : Rs {props.amount} </li>
                    </ul>
                    
                    {(visible && props.vendor_view)? 
                    <button className="btn btn-primary" id='movestage' onClick={()=>{movestage()}}>Move to Next stage</button>:
                    <br/>
                    }
                </div>

            </div>
        </div>

    )
}

export default Ordered;