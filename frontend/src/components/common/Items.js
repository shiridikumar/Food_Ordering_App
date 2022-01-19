import { Chip, Rating } from "@mui/material";
import "./../css/components.css"
const Items = (props) => {
    return(
    <div className="card">
        <div className="card-body">
            <div className="pic">
                <img src={require('./../img/'+props.pic)}/>
            </div>

            <div className="description">
            <h6 style={{"backgroundColor":"rgba(0 0 0 / 0%)"}}>{props.name}</h6>
            <ul>
                <li>Vendor : {props.canteen}</li>
                <li>price : Rs {props.price}</li>
                <li>Tags : <Chip label={props.type} href="#basic-chip" />  <Chip label={props.item} href="#basic-chip" /> </li>               
            <div className="rating" style={{"display":"flex","marginTop":"5px"}}>
                <h6 style={{"display":"inline","fontWeight":"normal"}}>Rating :</h6><Rating name="read-only" value={4.5} readOnly precision={0.1} />

            </div>
            </ul>
            </div>
        </div>
    </div>
    )
}
export default Items;