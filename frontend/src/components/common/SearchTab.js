import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Items from "./Items";
import Navbar2 from "./Navbar2"

const SearchTab = () => {
    const location = useLocation();
    console.log(location.state.data);
    const item_details = location.state.results;
    const row = [];
    const [cont, setcont] = useState();
    const [starttime, setstart] = useState();
    const [endtime, setend] = useState();

    useEffect(() => {
        const loadtime = async () => {

        }
        loadtime();
    }, [starttime, endtime])
    const temp=[]



    useEffect(() => {
        const loadpost = async () => {
            const dateObj = new Date(Date.now());
            var hrs = String(dateObj.getHours()).padStart(2, '0')
            var mins = String(dateObj.getMinutes()).padStart(2, '0')
            const currtime = hrs + ':' + mins + ':' + '00';


            for (var i = 0; i < item_details.length; i++) {
                var ids = i + '_' + item_details[i].shop_name;
                await axios.post("http://localhost:4000/user/canteen", { canteen:item_details[i].shop_name }).then(response => {
                    setstart(response.data.starttime);
                    setend(response.data.endtime);
                    console.log("hellllllo");
                    if ((response.data.starttime > response.data.endtime && currtime > response.data.endtime) || (response.data.starttime < response.data.endtime && currtime > response.data.starttime && currtime < response.data.endtime)) {
                        row.push(<Items myorders={0} starttime={response.data.starttime} endtime={response.data.endtime} canteen={item_details[i].shop_name} id={ids} name={item_details[i].name} pic={item_details[i].pic} price={item_details[i].price} rating={item_details[i].rating} type={item_details[i].type} item={item_details[i].item} addons={item_details[i].add_ons} itemid={ids} data={location.state.data} />);
                    }
                    else{
                        temp.push(<Items myorders={0} starttime={response.data.starttime} endtime={response.data.endtime} canteen={item_details[i].shop_name} id={ids} name={item_details[i].name} pic={item_details[i].pic} price={item_details[i].price} rating={item_details[i].rating} type={item_details[i].type} item={item_details[i].item} addons={item_details[i].add_ons} itemid={ids} data={location.state.data} />);
                    }
                })
            }
            for(var i=0;i<temp.length;i++){
                row.push(temp[i]);
            }
            setcont(row);
        }
        loadpost();

    }, [])

    return (
        <div className="canteen">
            <Navbar2 name={location.state.data.name} data={location.state.data} />
            <div className="container">
                <h3>Search Results</h3>
                {cont}
            </div>
            <br />
        </div>
    )

}

export default SearchTab