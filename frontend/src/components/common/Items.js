import { Chip, Rating } from "@mui/material";
import axios, { Axios } from "axios";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./../css/components.css"
const Items = (props) => {
    const [adds, setadd] = useState();
    const add_price = [];
    const addons = [];
    let item_no;
    const [userfav, setfav] = useState();
    const [qnt, setqnt] = useState(1);
    const [isfav, setisfav] = useState(0);
    let ind = 1;
    let item_str;
    const navigate = useNavigate();

    const order = async (item) => {
        console.log(item);
        for (var i = 0; i < item.length; i++) {
            if (item[i] === '_') {
                ind = i;
            }
        }
        item_str = item.substring(0, ind);
        item_no = parseInt(item_str);
        var ele = document.getElementById(item);
        var req = ele.getElementsByTagName('input')[0];
        var qnt = parseInt(req.value);
        var price = props.price;
        console.log(price * qnt)
        var addonsprice = 0;
        for (var i = 0; i < props.addons.length; i++) {
            var add_el = document.getElementById(i + '_inp_addons_' + item)
            if (add_el.checked) {
                addonsprice += props.addons[i].price;
            }


        }
        const total_amount = (price * qnt) + addonsprice;
        console.log(total_amount);
        const order_details = {
            email: props.data.email,
            shop_name: props.canteen,
            food_item: props.name,
            quantity: qnt,
            status: "Placed",
            cost: total_amount,
            order_Time: Date.now(),
            wallet: props.data.wallet
        }
        if (props.data.wallet < total_amount) {
            alert("Oops u dont have enough money to order!!!");
        }
        else {
            await axios.post('http://localhost:4000/user/order', order_details).then(response => {
                console.log(response.data);
                navigate("/MyOrders", { state: { data: props.data } })
            })
                .catch(err => {
                    console.log(err);
                })
        }


    }
    const tag_row = [];
    const [tags, settags] = useState();
    useEffect(() => {
        if (!props.myorders) {
            for (var i = 0; i < props.addons.length; i++) {
                var li_ids = i + '_addons_' + props.id
                var inp_ids = i + '_inp_addons_' + props.id;
                addons.push(
                    <li className="list-group-item" id={li_ids} key={li_ids}>
                        <input className="form-check-input me-1" type="checkbox" key={inp_ids} value="" aria-label="..." id={inp_ids} />
                        {props.addons[i].name} for Rs {props.addons[i].price}
                    </li>
                );
            }
            setadd(addons);
        }
        for (var i = 0; i < props.item.length; i++) {
            tag_row.push(<Chip label={props.item[i]} href="#basic-chip" />);
        }
        settags(tag_row);
        const loadpost = async () => {
            await axios.post("http://localhost:4000/user/userdetails", { email: props.data.email }).then(response => {
                setfav(response.data.favourites);
                for (var i = 0; i < response.data.favourites.length; i++) {
                    if (response.data.favourites[i].food == props.name && response.data.favourites[i].shop_name == props.canteen) {
                        setisfav(1);
                    }
                }
                //console.log(response.data.favourites);
            })
        }
        loadpost();
    }, []);

    const addfav = async () => {
        var obj = userfav;
        console.log(userfav);
        if (obj) {
            obj.push({ food: props.name, shop_name: props.canteen });
            //console.log(obj);
        }
        else {
            // console.log(obj);
            obj = [{ food: props.name, shop_name: props.canteen }]
        }

        await axios.post("http://localhost:4000/user/addfav", { crossdomain: true, email: props.data.email, fav: obj }).then(response => {
            //console.log(response);
            window.location.reload();
        })
            .catch(err => {
                console.log(err);
            })
    }

    const remfav =async () => {
        var obj = userfav;
        var newob = [];
        for (var i = 0; i < obj.length; i++) {
            if (obj[i].food != props.name || obj[i].shop_name != props.canteen) {
                newob.push(obj[i]);
            }
        }
        console.log(newob);
        await axios.post("http://localhost:4000/user/addfav", { crossdomain: true, email: props.data.email, fav: newob }).then(response => {
            //console.log(response);
            window.location.reload();
        })
        .catch(err => {
            console.log(err);
        })

    }


    return (
        <div className="card" id={props.itemid}>
            <div className="card-body">
                <div className="pic">
                    <img src={require('./../img/' + props.pic)} />
                </div>
                <div className="description">
                    <h6 style={{ "backgroundColor": "rgba(0 0 0 / 0%)" }}>{props.name}</h6>
                    <ul>
                        <li>Vendor : {props.canteen}</li>
                        <li>price : Rs {props.price}</li>
                        <li>Tags : <Chip label={props.type} href="#basic-chip" />  {tags} </li>
                        <div className="rating" style={{ "display": "flex", "marginTop": "5px" }}>
                            <h6 style={{ "display": "inline", "fontWeight": "normal" }}>Rating :</h6><Rating name="read-only" value={4.5} readOnly precision={0.1} />
                        </div>
                    </ul>
                </div>
                {!props.myorders &&
                    <>
                        <div className="quantity">
                            <input type="number" className="form-control" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1" value={qnt} onChange={(e) => { (e.target.value < 1) ? setqnt(1) : setqnt(e.target.value) }} />
                            <button className="btn btn-danger" onClick={() => order(props.itemid)} >Order now</button>
                        </div>
                        <div className="right">
                            <div className="addons">
                                <h6 style={{ "fontWeight": "normal", "fontSize": "14px" }}>Addons</h6>
                                {adds}
                            </div>
                            {!isfav ?
                                <a style={{ "fontWeight": "bold", "fontSize": "12px", "cursor": "pointer" }} onClick={() => { addfav() }} >Add to Favourites</a> :
                                <a style={{ "fontWeight": "bold", "fontSize": "12px", "cursor": "pointer" }} onClick={() => { remfav() }} >Remove from Favourites</a>
                            }
                        </div>
                    </>
                }

            </div>

        </div>
    )
}
export default Items;