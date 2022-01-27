import { Chip, Rating, Typography } from "@mui/material";
import axios, { Axios } from "axios";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./../css/components.css"





const Ordered = (props) => {

    const [name, setname] = useState();
    const [pic, setpic] = useState('no.png');
    const [item, setitem] = useState();
    const [type, settype] = useState();
    const [visible, setvis] = useState(1);
    const [rating, setrat] = useState(0);
    const [reject, setrej] = useState(1);
    const [tags, settagscont] = useState();
    const [rate,setuserrate]=useState(0);
    const tagrow = []
    const [rated,setnum]=useState();
    console.log(props.rating);
    useEffect(() => {


        const getitems = async (shop_name, food) => {
            await axios.post('http://localhost:4000/user/itemdetails', { crossdomain: true, item: food, canteen: shop_name }).then(resp => {
                setname(resp.data.name);
                setpic(resp.data.pic);
                setitem(resp.data.item);
                settype(resp.data.type);
                setnum(resp.data.rated);
                setrat(resp.data.rating);
                for (var i = 0; i < resp.data.item.length; i++) {
                    tagrow.push(<Chip label={resp.data.item[i]} href="#basic-chip" />)
                }
                settagscont(tagrow);
            });
        }
        getitems(props.canteen, props.food);
        if (props.status === 'Rejected' || props.status === 'Completed') {
            setvis(0);
        }
    }, [])
    console.log(pic, type, rating, name, item);
    var dateObj = new Date(props.time);
    var month = dateObj.getMonth() + 1; //months from 1-12
    var day = dateObj.getDate();
    var year = dateObj.getFullYear();
    var hrs = dateObj.getHours();
    var mins = dateObj.getMinutes();
    const ntime = hrs + ':' + mins;
    const ndate = day + "/" + month + "/" + year;

    const colorcodes = {
        "Placed": '#dc3545',
        "Accepted": '#0d6efd',
        "Cooking": '#ffc107',
        "Ready for Pickup": '#0dcaf0',
        "Completed": "#198754",
        "Rejected": "#212529"
    }

    const userrated=async()=>{
        await axios.post("http://localhost:4000/user/rate",{crossdomain:true,orderid:props.order_id,food:props.food,shop_name:props.target,rated:rated,original:rating,rating:rate}).then(response=>{
            console.log(response.data);
            window.location.reload();
        })
    }


    const [col_code, setcol] = useState(colorcodes[props.status]);
    const movestage = async () => {
        await axios.post("http://localhost:4000/user/movestage", { crossdomain: true, orderid: props.order_id }).then(response => {
            console.log(response);
            var ele = document.getElementById(props.order_id);
            console.log(ele);
            //ele.setAttribute('className',response.data);
            ele.innerHTML = response.data;
            setcol(colorcodes[response.data]);
            if (response.data === 'Completed' || response.data === 'Rejected' || response.data == 'Ready for Pickup') {
                setvis(0);
            }
            if (response.data != 'Placed') {
                setrej(0);
            }
        })
    }
    const rejectstage = async () => {
        await axios.post("http://localhost:4000/user/rejectstage", { crossdomain: true, orderid: props.order_id,email:props.target,cost:props.amount}).then(response => {
            console.log(response);
            var ele = document.getElementById(props.order_id);
            console.log(ele);
            //ele.setAttribute('className',response.data);
            ele.innerHTML = response.data;
            setcol(colorcodes[response.data]);
            if (response.data === 'Completed' || response.data === 'Rejected') {
                setvis(0);
            }
            if (response.data != 'Placed') {
                setrej(0);
            }
        })
    }
    const pickuporder = async () => {
        await axios.post("http://localhost:4000/user/pickorder", { crossdomain: true, orderid: props.order_id }).then(response => {
            console.log(response);
            window.location.reload();
        })
    }
    return (
        <div className="card" id={props.itemid}>
            <div className="card-body">
                <div className="pic">
                    <img src={require('./../images/' + pic)} />
                    <button className='btn' id={props.order_id} style={{ "fontWeight": "normal", "color": "white", "backgroundColor": col_code }}>{props.status}</button>
                    {(!(props.vendor_view) && props.status == 'Ready for Pickup') &&
                        <button className="btn btn-secondary" onClick={() => { pickuporder() }}>Pick your order</button>
                    }

                </div>
                <div className="description">
                    <h6 style={{ "fontWeight": "bold" }}>{props.food}</h6>
                    <ul>
                        {!props.vendor_view ?
                            <li>Vendor : {props.target}</li> :
                            <li>Buyer Email : {props.target}</li>
                        }
                        <li>Type: <Chip label={type} href="#basic-chip" /> </li>
                        <li>Tags : {tags} </li>
                        {!props.vendor_view &&
                            <div className="rating" style={{ "display": "flex", "marginTop": "5px" }}>
                                <h6 style={{ "display": "inline", "fontWeight": "normal" }}>Rating :</h6><Rating name="read-only" value={rating} key={props.order_id+'rate'} readOnly precision={0.1} />
                            </div>
                        }
                        <li>Quantity : {props.quantity} </li>
                        <li>Ordered Time : {ntime} </li>
                        <li>Ordered Date : {ndate}</li>
                        <li style={{ "fontWeight": "bold" }}>Bill amount : Rs {props.amount} </li>
                    </ul>

                    {(visible && props.vendor_view && props.status != 'Completed' && props.status != 'Ready for Pickup') ?

                        <button className="btn btn-primary" id='movestage' onClick={() => { movestage() }}>Move to Next stage</button> :

                        <br />
                    }
                    {((props.status === 'Placed') && reject && props.vendor_view) ?
                        <buttton className='btn btn-danger' style={{ "width": "250px", "marginTop": "5px" }} onClick={() => { rejectstage() }}>Reject</buttton> :
                        <br />
                    }
                </div>
                {!(props.vendor_view) && props.status == 'Completed' && props.rating==-1 &&
                    <div className="give-rating">
                        Rate your order :)
                        <Rating
                            name="simple-controlled"
                            key={props.order_id}
                            value={rate}
                            onChange={(event, newValue) => {
                                setuserrate(newValue);
                            }}
                        />
                        <button className="btn btn-primary" style={{"width":"100px"}} onClick={()=>{userrated()}}>Submit</button>
                    </div>
                }

            </div>
        </div>

    )
}

export default Ordered;