import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Items from "./Items";
import Navbar2 from "./Navbar2";

const Canteen = (props) => {
    const location = useLocation();
    const params = location.state
    const [details, setdetails] = useState();
    const items = []
    var ids;
    const [starttime, setstart] = useState();
    const [endtime, setend] = useState();
    useEffect(() => {
        const loadtime = async () => {

            await axios.post("/user/canteen", { canteen: params.params,
                headers:{
                    "accepts":"application/json"
                } }).then(response => {
                setstart(response.data.starttime);
                setend(response.data.endtime);
                //log(starttime);
                //log(endtime);  
            })
        }
        loadtime();
    }, [starttime, endtime])

    const temp=[];
    useEffect(() => {
        const loadpost = async () => {
            const dateObj = new Date(Date.now());
            var hrs = String(dateObj.getHours()).padStart(2, '0')
            var mins = String(dateObj.getMinutes()).padStart(2, '0')
            const currtime = hrs + ':' + mins + ':' + '00';
            await axios.post("/user/vendoritems", { crossdomain: true, shop_name: params.params ,
                headers:{
                    "accepts":"application/json"
                }}).then(response => {
                console.log(starttime,endtime);
                console.log(response.data);
                for (var i = 0; i < response.data.length; i++) {
                    ids = i + '_' + params.params;
                    if ((starttime > endtime && currtime > endtime) || (starttime<endtime && currtime>starttime && currtime<endtime )) {
                        items.push(<Items myorders={0} starttime={starttime} endtime={endtime} canteen={params.params} id={ids} name={response.data[i].name} pic={response.data[i].pic} price={response.data[i].price} rating={response.data[i].rating} type={response.data[i].type} item={response.data[i].item} addons={response.data[i].add_ons} itemid={ids} data={location.state.data} />);
                    }
                    else{
                        temp.push(<Items myorders={0} starttime={starttime} endtime={endtime} canteen={params.params} id={ids} name={response.data[i].name} pic={response.data[i].pic} price={response.data[i].price} rating={response.data[i].rating} type={response.data[i].type} item={response.data[i].item} addons={response.data[i].add_ons} itemid={ids} data={location.state.data} />);

                    }
                    console.log(i);
                };
                for(var i=0;i<temp.length;i++){
                    items.push(temp[i]);
                }
                console.log(items);
                setdetails(items);
            })
        }
        loadpost();
    }, [starttime,endtime]);
    const name = params.params + ' Canteen'

    return (
        <div className="canteen">
            <Navbar2 name={name} data={params.data} />
            <div className="container">
                <h3>Menu</h3>
                {details}
            </div>
            <br />
        </div>

    )
}

export default Canteen;