import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Items from "./Items";
import Navbar2 from "./Navbar2";

const Canteen = (props) => {
    const location=useLocation();
    const params = location.state
    const [details,setdetails]=useState();
    const items=[]
    var ids;
    useEffect(() => {
        const loadpost= async()=>{
            await axios.post("http://localhost:4000/user/vendoritems", { crossdomain: true,shop_name:params.params }).then(response=>{
                for(var i=0;i<response.data.length;i++){
                    ids=i+'_'+params.params;
                    items.push(<Items myorders={0} canteen={params.params} id={ids} name={response.data[i].name} pic={response.data[i].pic} price={response.data[i].price} rating={response.data[i].rating} type={response.data[i].type} item={response.data[i].item}  addons={response.data[i].add_ons} itemid={ids} data={location.state.data}/>);
                };
                setdetails(items);
            })
        }
        loadpost();
    }, []);
    const name=params.params+' Canteen'

    return (
        <div className="canteen">
            <Navbar2 name={name} />
            <div className="container">
                <h3>Menu</h3>
                {details}
            </div>
            <br/>
        </div>

    )
}

export default Canteen;