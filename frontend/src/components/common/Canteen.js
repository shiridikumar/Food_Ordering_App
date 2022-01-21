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
            await axios.post("http://localhost:4000/user/canteen", { crossdomain: true,canteen:params.params }).then(response=>{
                for(var i=0;i<response.data.items.length;i++){
                    ids=i+'_'+params.params;
                    items.push(<Items canteen={params.params} id={ids} name={response.data.items[i].name} pic={response.data.items[i].pic} price={response.data.items[i].price} rating={response.data.items[i].rating} type={response.data.items[i].type} item={response.data.items[i].item}  addons={response.data.items[i].add_ons} itemid={ids} data={location.state.data}/>);
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