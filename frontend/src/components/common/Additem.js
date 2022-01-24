import { Chip, Icon, Radio } from "@mui/material";
import { useEffect, useState } from "react";
const Additem = () => {
    const [tags,settags]=useState([]);
    let temp=[];
    const chip_arr=[]
    const [cont ,setcont]=useState();
    const [addonsname,setnames]=useState([]);
    const [addonsprice,setprice]=useState([]);
    let tempnames=[];
    let tempprices=[];

    const addtag=()=>{
        temp=tags;
        var ele=document.getElementById("new_tagname");
        temp.push(ele.value);
        for(var i=0;i<temp.length;i++){
            chip_arr.push(<Chip label={temp[i]} href="#basic-chip"/>)
        }
        setcont(chip_arr);
        temp=tags;
        console.log(tags,temp);
        settags(temp);
        ele.value='';
    }

    const addon=()=>{
        tempnames=addonsname;
        tempprices=addonsprice;
        var ele=document.getElementById("new_addonname");
        var ele1=document.getElementById("new_addonsprice");
        tempnames.push(ele.value);
        tempprices.push(ele1.value);
        setnames(tempnames);
        setprice(tempprices);
        console.log(addonsname,addonsprice);
        ele.value='';
        ele1.value=null;
        alert("Addon addeed  :)")

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
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body additem">
                            <div className="fooddetails">
                                <div class="form-floating mb-3 itemname">
                                    <input type="text" class="form-control foodname" id="new_fooditem" placeholder="double cheese pizza" />
                                    <label for="new_fooditem">Item name</label>
                                </div>

                                <div className="vegn">
                                    <input type="radio" id="veg_add" name={"veg_add"} value="veg" />
                                    <label for={"veg_add"}>Veg</label>
                                    <input type="radio" id={"non-veg_add"} name={"veg_add"} value="non-veg" />
                                    <label for={"non-veg_add"}>Non-Veg</label><br></br>
                                </div>

                                <div className="priceadd">
                                    <div class="form-floating mb-3 pricedetails">
                                        <input type="number" class="form-control" id="new_foodprice"  />
                                        <label for="new_foodprice">price</label>
                                    </div>
                                </div>

                                <div className="addtags">
                                    <div class="form-floating mb-3 itemtags">
                                        <input type="text" class="form-control tagname" id="new_tagname" placeholder="pizzas" />
                                        {cont}
                                        <Icon style={{ "cursor": "pointer" }} onClick={() => { addtag() }}>add_circle</Icon>
                                    </div>

                                </div>

                                <div className="addaddons">
                                    <div class="form-floating mb-3 addonsname">
                                        <input type="text" class="form-control nameaddon" id="new_addonname"  />
                                        <label for="new_addonname">Addon name</label>
                                    </div>

                                    <div class="form-floating mb-3 addonsprice">
                                        <input type="number" class="form-control priceaddons" id="new_addonsprice"  />
                                        <label for="new_addonsprice">price</label>
                                    </div>
                                    <Icon style={{ "cursor": "pointer" }} onClick={() => { addon() }}>add_circle</Icon>
                                

                                </div>

                                <div className="imageupload">
                                
                                <form action="http://localhost:4000/user/uploadpic" enctype="multipart/form-data" method="POST">
                                <div class="input-group mb-3">
                                <input type="file" class="form-control" id="inputGroupFile03" name="image" aria-describedby="inputGroupFileAddon03" aria-label="Upload"/>
                                <input type="submit" value="submit"/> 
                                </div>
                                </form>
                                
                                </div>




                            </div>






















                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Additem;