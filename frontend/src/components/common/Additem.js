import { Chip, Icon, Radio } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
const Additem = (props) => {
    console.log(props)
    const [tags, settags] = useState([]);
    let temp = [];
    const chip_arr = []
    const [cont, setcont] = useState();
    const [addonsname, setnames] = useState([]);
    const [addonsprice, setprice] = useState([]);
    const [name,setname]=useState();
    const [price,setitemprice]=useState();
    let tempnames = [];
    let tempprices = [];

    const addtag = () => {
        temp = tags;
        var ele = document.getElementById("new_tagname");
        temp.push(ele.value);
        for (var i = 0; i < temp.length; i++) {
            chip_arr.push(<Chip label={temp[i]} href="#basic-chip" />)
        }
        setcont(chip_arr);
        temp = tags;
        console.log(tags, temp);
        settags(temp);
        ele.value = '';
    }
    /*
    <div className="imageupload">
    <div className="input-group mb-3">
        <input type="file" className="form-control" id="inputGroupFile03" name="image" aria-describedby="inputGroupFileAddon03" aria-label="Upload" />
    </div>
</div>*/

    const addon = () => {
        tempnames = addonsname;
        tempprices = addonsprice;
        var ele = document.getElementById("new_addonname");
        var ele1 = document.getElementById("new_addonsprice");
        tempnames.push(ele.value);
        tempprices.push(ele1.value);
        setnames(tempnames);
        setprice(tempprices);
        console.log(addonsname, addonsprice);
        ele.value = '';
        ele1.value = null;
        alert("Addon addeed  :)")

    }
    const savefood=async()=>{
        const addons=[]
        for(var i=0;i<addonsname.length;i++){
            addons.push({name:addonsname[i],price:addonsprice[i]})
        }
        var ele=document.getElementById('veg_add');
        var nele=document.getElementById('non-veg_add');
        var type='veg';
        if(ele.checked){
            type='veg';
        }
        else{
            type='non-veg'
        }
        const details={
            name:name,
            price:parseInt(price),
            item:tags,
            add_ons:addons,
            type:type,
            shop_name:props.details.shop_name
        }
        await axios.post("http://localhost:4000/user/newitem",details).then(response=>{
            console.log(response);
        })
        window.location.reload();
    }

    return (
        <>
            <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ "margin-left": "35px" }}>
                Add item
            </button>
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Add new Food Item</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body additem">
                            <div className="fooddetails">
                                <form action="http://localhost:4000/user/uploadpic" enctype="multipart/form-data" method="POST">
                                    <div className="form-floating mb-3 itemname">
                                        <input type="text" className="form-control foodname" id="new_fooditem" name="name" placeholder="double cheese pizza" onChange={(e)=>setname(e.target.value)}/>
                                        <label for="new_fooditem">Enter Item name</label>
                                    </div>
                                    <div className="vegn">
                                        <input type="radio" id="veg_add" name={"veg_add"} value="veg" name="veg" style={{ "width": "20px" }} />
                                        <label for={"veg_add"}>Veg</label>
                                        <input type="radio" id={"non-veg_add"} name={"veg_add"} value="non-veg" name="non-veg" style={{ "width": "20px" }} />
                                        <label for={"non-veg_add"}>Non-Veg</label><br></br>
                                    </div>
                                    <div className="priceadd">
                                        <div className="form-floating mb-3 pricedetails">
                                            <input type="number" className="form-control" id="new_foodprice" name="price" placeholder="enter price" onChange={(e)=>setitemprice(e.target.value)}/>
                                            <label for="new_foodprice">Enter price</label>
                                        </div>
                                    </div>
                                    <div className="addtags">
                                        <div className="form-floating mb-3 itemtags">
                                            <input type="text" className="form-control tagname" name="tags" id="new_tagname" placeholder="pizzas" />
                                            <label for="new_foodprice">Add a tag</label>
                                            {cont}
                                            <Icon style={{ "cursor": "pointer" }} onClick={() => { addtag() }}>add_circle</Icon>
                                        </div>
                                    </div>
                                    <div className="addaddons">
                                        <div className="form-floating mb-3 addonsname">
                                            <input type="text" className="form-control nameaddon" name="addoname" id="new_addonname" placeholder="addon name" />
                                            <label for="new_addonname">Addon name</label>
                                        </div>
                                        <div className="form-floating mb-3 addonsprice">
                                            <input type="number" className="form-control priceaddons" name="addonprice" id="new_addonsprice" placeholder="addone price" />
                                            <label for="new_addonsprice">Addon price</label>
                                        </div>
                                        <Icon style={{ "cursor": "pointer" }} onClick={() => { addon() }}>add_circle</Icon>
                                    </div> 
                                </form>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={()=>{savefood()}}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Additem;