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
    const statusarr={
        "Placed":"btn btn-danger",
        "Accepted":"btn btn-primary",
        "Cooking":"btn btn-warning",
        "Ready for Pickup":"btn btn-info",
        "Completed":"btn btn-success",
        "Rejected":"btn btn-dark"
    }


    return (
        <div className="card" id={props.itemid}>
            <div className="card-body">
                <div className="pic">
                    <img src={require('./../img/' + pic)} />
                    <button className={statusarr[props.status]}>{props.status}</button>
                </div>
                <div className="description">
                    <h6 style={{"fontWeight":"bold"}}>{props.food}</h6>
                    <ul>
                        <li>Vendor : {props.canteen}</li>
                        <li>Tags : <Chip label={type} href="#basic-chip" />  <Chip label={item} href="#basic-chip" /> </li>
                        <div className="rating" style={{ "display": "flex", "marginTop": "5px" }}>
                            <h6 style={{ "display": "inline", "fontWeight": "normal" }}>Rating :</h6><Rating name="read-only" value={4.5} readOnly precision={0.1} />
                        </div>
                        <li>Quantity : {props.quantity} </li>
                        <li>Ordered Time : {ntime} </li>
                        <li>Ordered Date : {ndate}</li>
                        <li style={{"fontWeight":"bold"}}>Bill amount : Rs {props.amount} </li>
                    </ul>
                </div>
            </div>
        </div>

    )
}

export default Ordered;