import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Items from "./Items";
import Navbar2 from "./Navbar2"

const SearchTab=()=>{
    const location =useLocation();
    console.log(location.state.data);
    const item_details=location.state.results;
    const row=[];
    const[cont,setcont]=useState();
    useEffect(()=>{
        const loadpost =()=>{
            for(var i=0;i<item_details.length;i++){
                var ids=i+'_'+item_details.shop_name;
                row.push(<Items myorders={0} canteen={item_details[i].shop_name} id={ids} name={item_details[i].name} pic={item_details[i].pic} price={item_details[i].price} rating={item_details[i].rating} type={item_details[i].type} item={item_details[i].item}  addons={item_details[i].add_ons} itemid={ids} data={location.state.data}/>);
            }
            setcont(row);
        }
        loadpost();

    },[])
    
    return (
        <div className="canteen">
            <Navbar2 name={location.state.data.name} />
            <div className="container">
                <h3>Search Results</h3>
                {cont}
            </div>
            <br/>
        </div>
    )

}

export default SearchTab