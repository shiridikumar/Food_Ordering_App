import { Chip, Rating } from "@mui/material";
import { useEffect, useState } from "react";
import "./../css/components.css"
const Items = (props) => {
    const [adds, setadd] = useState();
    //for(var i=0;i<props.addons.length;i++){
    //  addons.push(props.addons[i].name);
    //}
    const add_price = [];
    const addons = [];
    useEffect(() => {
        for (var i = 0; i < props.addons.length; i++) {
            var li_ids = i + 'addons' + props.canteen;
            var inp_ids = i + 'price_addons' + props.canteen;
            addons.push(
                <li className="list-group-item" id={li_ids} key={li_ids}>
                    <input className="form-check-input me-1" type="checkbox" key={inp_ids} value="" aria-label="..." id={inp_ids} />
                    {props.addons[i].name} for Rs {props.addons[i].price}
                </li>
            );
        }
        setadd(addons);
    }, []);


    return (
        <div className="card">
            <div className="card-body">
                <div className="pic">
                    <img src={require('./../img/' + props.pic)} />
                </div>

                <div className="description">
                    <h6 style={{ "backgroundColor": "rgba(0 0 0 / 0%)" }}>{props.name}</h6>
                    <ul>
                        <li>Vendor : {props.canteen}</li>
                        <li>price : Rs {props.price}</li>
                        <li>Tags : <Chip label={props.type} href="#basic-chip" />  <Chip label={props.item} href="#basic-chip" /> </li>
                        <div className="rating" style={{ "display": "flex", "marginTop": "5px" }}>
                            <h6 style={{ "display": "inline", "fontWeight": "normal" }}>Rating :</h6><Rating name="read-only" value={4.5} readOnly precision={0.1} />
                        </div>
                    </ul>
                </div>
                <div className="quantity">
                    <input type="number" class="form-control" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1"/>
                    <button className="btn btn-danger">Add to cart</button>

                </div>
                
                <div className="addons">
                    <h6 style={{ "fontWeight": "normal", "fontSize": "14px" }}>Addons</h6>
                    {adds}
                </div>

            </div>

        </div>
    )
}
export default Items;