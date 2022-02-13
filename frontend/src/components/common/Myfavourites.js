import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Items from "./Items";
import Navbar2 from "./Navbar2";


const Myfavourites=()=>{
    const location=useLocation();
    const [details,setdetails]=useState();
    const [fav,setfav]=useState([]);
    const items=[]
    var ids;
    useEffect(()=>{
        const loadpost=async()=>{
            await axios.post("/user/userdetails",{email:location.state.data.email,headers:{
                "accepts":"application/json"
            }}).then(response=>{
                setfav(response.data.favourites);
                loaditems(response.data.favourites);
            })
            .catch(err=>{
                console.log(err);
            })
        }
        loadpost();
        const loaditems=async(obj)=>{
            for(var i=0;i<obj.length;i++){
                await axios.post("/user/itemdetails",{canteen:obj[i].shop_name,item:obj[i].food,headers:{
                    "accepts":"application/json"
                }}).then(response=>{
                    console.log(response);
                    ids=i+'_'+obj[i].shop_name+'_'+obj[i].food;
                    items.push(<Items myorders={0} canteen={obj[i].shop_name} id={ids} name={response.data.name} pic={response.data.pic} price={response.data.price} rating={response.data.rating} type={response.data.type} item={response.data.item}  addons={response.data.add_ons} itemid={ids} data={location.state.data}/>);
                })
            }
            setdetails(items) ;
        }
    },[])
    
    return (
        <div className="canteen">
            <Navbar2 name={location.state.data.name} data={location.state.data} />
            <div className="container">
                <h3>Favourites</h3>
                {details}
            </div>
            <br/>
        </div>
    )

}

export default Myfavourites;