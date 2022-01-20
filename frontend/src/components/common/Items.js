import { Chip, Rating } from "@mui/material";
import { useEffect, useState } from "react";
import "./../css/components.css"
const Items = (props) => {
    const [adds,setadd]=useState();
    //for(var i=0;i<props.addons.length;i++){
      //  addons.push(props.addons[i].name);
    //}
    const add_price=[];
    const addons=[];
   


    const loadcont=()=>{
        for(var i=0;i<props.addons.length;i++){
            addons.push(props.addons[i].name);
        }
        return (
            addons.map((addons,i) =>{
                <li class="list-group-item">
                    <input class="form-check-input me-1" type="checkbox" key={i} value="" aria-label="..."/>
                    {addons}
                </li>
            })
        )

    }
    useEffect(()=>{

        const a=loadcont();
        setadd(a);

    },[]);

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
                <div className="addons">
                    {adds}
                </div>
            </div>
        </div>
    )
}
export default Items;