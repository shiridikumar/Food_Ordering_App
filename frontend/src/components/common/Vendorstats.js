import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import Edititem from "./Edititem";
import Navbar2 from "./Navbar2";

const Vendorstats = (props) => {
    const location = useLocation();
    const details = location.state.data;
    const row=[];
    const [cont,setcont]=useState();
    const [completed,setcomp]=useState();
    const [pending,setpend]=useState();
    const [placed,setplaced]=useState();
    const [statuscount,setstat]=useState();
    const statrow=[]
    useEffect(()=>{
        const loadpost=async()=>{
            await axios.post("http://localhost:4000/user/mostsold",{name:details.shop_name}).then(response=>{
                console.log(response);
                loaditems(response.data);
            })
            .catch(err=>{
                console.log(err);
            })
            await axios.post("http://localhost:4000/user/statuscount",{name:details.shop_name}).then(response=>{
                console.log(response.data);
                const placedpercent=parseInt((response.data.Placed/response.data.Placed)*100);
                const pendingpercent=parseInt((response.data.Pending/response.data.Placed)*100);
                const completedpercent=parseInt((response.data.Completed/response.data.Placed)*100);

                statrow.push(
                    <ul>
                        <h4>Placed orders : {response.data.Placed}</h4>
                    <li>
                    <div className="placed" style={{"background":"grey",width:placedpercent+'%',"borderRadius":"20px","height": "30px" ,"color":"white","fontWeight":"bold","textAlign":"center"}}>
                        {placedpercent }%
                    </div>
                    </li>
                    <h4>Pending orders : {response.data.Pending}</h4>
                    <li>
                    <div className="pending" style={{"background":"grey",width:pendingpercent+'%',"borderRadius":"20px","height": "30px","color":"white","fontWeight":"bold","textAlign":"center"}}>
                        {pendingpercent }%
                    </div>
                    </li>
                    <h4>Completed orders : {response.data.Completed}</h4>
                    <li>
                    <div className="completed" style={{"background":"grey",width:completedpercent+'%',"borderRadius":"20px","height": "30px","color":"white","fontWeight":"bold","textAlign":"center"}}>
                        {completedpercent}%
                    </div>
                    </li>
                    </ul>
                )
                setstat(statrow)
                
            })
            .catch(err=>{
                console.log(err);
            })
        }
        loadpost();

        const loaditems=async(items)=>{
            for(var i=0;i<items.length;i++){
                await axios.post("http://localhost:4000/user/itemdetails",{canteen:details.shop_name,item:items[i]._id}).then(response=>{
                    console.log(response);
                    var ids=i+'_'+details.shop_name+'_'+items[i]._id;
                    row.push(
                    <div className="positions">
                        <h4>#{i+1} , Sold: {items[i].count}</h4>
                        <Edititem details={response.data} itemid={ids} shop_name={details.shop_name}/>
                    </div>
                    )
                })
            }
            setcont(row);

        }


    },[])
    return (
        <div className="stats">
            <Navbar2 name={details.shop_name} vendor_view={1} data={details} />
            <h3>Top 5 Items</h3>
            <div className="most-sold vendor-menu pending-orders">
                {cont}
            </div>
            <hr/>
            <div className="status-count">
                <h3> Some statistics of orders</h3>
                {statuscount}

            </div>
        </div>
    )


}
export default Vendorstats