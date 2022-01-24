import { Chip, Icon, Radio } from "@mui/material";
import axios, { Axios } from "axios";
import { useEffect, useState } from "react";


const Edititem = (props) => {
    const details = props.details;
    const [name, setname] = useState(details.name);
    const [price, setprice] = useState(details.price);
    const [type, settype] = useState();
    var r = details.item;
    //.log(r);
    const row = []
    const present_tags = [];
    const [cont, setcont] = useState();

    useEffect(() => {
        //.log(details);
        const calltags = () => {
            for (var i = 0; i < r.length; i++) {
                row.push(<Chip label={r[i]} href="#basic-chip" />)
                //.log("hellooooo");
            }
            setcont(row);
            setfr(r);
        }
        calltags();
        if(details.type=='veg'){
            var veg=document.getElementById("veg_"+details.name).checked=true;
            //.log(veg);
        }
        else{
            var nveg=document.getElementById("non-veg_"+details.name).checked=true;
        
        }

    }, [])
    const ids = details.itemid + 'edit-details';
    const [button_click, setbut] = useState(0);
    var del_row = [];
    const [new_tag, settag] = useState();
    const ltags = r.length;
    var nt = 0;
    const [fr, setfr] = useState();
    const del_chip = (a) => {
        //.log(a)
        var ind = a.target.parentElement.getAttribute("id");
        if (!ind) {
            ind = a.target.parentElement.parentElement.getAttribute("id");
        }
        //.log(ind);
        var ele = document.getElementById(ind);
        var tar;
        for (var i = 0; i < ind.length; i++) {
            if (ind[i] == '_') {
                tar = i;
                break;
            }
        }
        //.log(del_row);
        var del_el = ind.slice(0, tar);
        //.log(r);
        for (var i = 0; i < r.length; i++) {
            if (r[i] == del_el) {
                r.splice(i, 1);
                del_row.splice(i, 1);
            }
        }
        //.log(r);
        setcont(r);
        setfr(r);
        //.log(del_row);
        var ne = [];
        for (var i = 0; i < del_row.length; i++) {
            ne.push(del_row[i]);
        }
        setcont(ne);

    }
    const addtag = () => {
        nt++;
        var wanted = document.getElementById('input_tag' + details.itemid).value
        r.push(wanted);
        setfr(r);
        var ne = []
        var i = ltags + nt;
        //.log(wanted);

        //del_row.push(<Chip id={new_tag+'_'+i+'_chips_'+details.itemid} label={new_tag} key={i+'_chip_'+details.itemid} onDelete={(a)=>del_chip(a)}/>);
        for (var i = 0; i < r.length - 1; i++) {
            ne.push(del_row[i]);
        }
        //del_row.push(<Chip id={new_tag+'_'+i+'_chips_'+details.itemid} label={new_tag} key={i+'_chip_'+details.itemid} onDelete={(a)=>del_chip(a)}/>);
        ne.push(<Chip id={wanted + '_' + i + '_chips_' + details.itemid} label={wanted} key={i + '_chip_' + details.itemid} onDelete={(a) => del_chip(a)} />);
        ne.push(del_row[del_row.length - 2]);
        ne.push(del_row[del_row.length - 1]);
        del_row = ne;
        setcont(ne);
    }

    const edititems = async () => {
        if (button_click == 0) {
            var ele = document.getElementById(ids);
            var edit_items = ele.getElementsByTagName('input');
            for (var i = 0; i < edit_items.length; i++) {
                edit_items[i].disabled = false;
            }
            for (var i = 0; i < fr.length; i++) {
                del_row.push(<Chip id={fr[i] + '_' + i + '_chips_' + details.itemid} label={fr[i]} key={i + '_chip_' + details.itemid} onDelete={(a) => del_chip(a)} />)
            }
            del_row.push(<input id={'input_tag' + details.itemid} type="text" placeholder="add a tag" style={{ "width": "100px" }} onChange={e => settag(e.target.value)} />);
            del_row.push(<Icon style={{ "cursor": "pointer" }} onClick={() => { addtag() }}>add_circle</Icon>);
            setcont(del_row);
            var vegn = document.getElementById('veg_' + details.name).disabled = false;
            var nveg = document.getElementById('non-veg_' + details.name).disabled = false;
            var but = document.getElementById("editfoods" + props.itemid);
            but.innerHTML = "Save";
            r = fr;
            setbut(1);
        }
        else {
            //.log("here click");
            var ele = document.getElementById(ids);
            var edit_items = ele.getElementsByTagName('input');
            r = fr;
            for (var i = 0; i < edit_items.length; i++) {
                edit_items[i].disabled = true;
            }

            //.log(r);
            for (var i = 0; i < fr.length; i++) {
                del_row.push(<Chip label={fr[i]} />)
            }
            setcont(del_row);
            var but = document.getElementById("editfoods" + props.itemid);
            but.innerHTML = "Edit";
            setbut(0);
            var vegn = document.getElementById('veg_' + details.name);
            var typ=props.type;
            if (vegn.checked) {
                typ="veg";
            }
            vegn.disabled=true;
            var nveg = document.getElementById('non-veg_' + details.name);
            console.log(nveg.checked);
            if (nveg.checked) {
                console.log("dddddddddddddddd");
                typ="non-veg";
            }
            nveg.disabled=true;
            var edited = {
                shop_name:props.shop_name,
                original:details.name,
                name: name,
                price: price,
                item: fr,
                type: typ
            }
            console.log(edited);
            await axios.post("http://localhost:4000/user/edititem", edited ).then(reponse => {
                //.log(reponse.data);
            })
                .catch(err => {
                    //.log(err);
                })
        }
    }

    const deleteitems=async()=>{
        await axios.post("http://localhost:4000/user/deleteitems",{shop_name:props.shop_name,name:details.name}).then(response=>{
            console.log("succesful");
            window.location.href = window.location.href;
        })
    }

    return (
        <div className="card" id={details.itemid}>
            <div className="card-body">
                <div className="pic-upload">
                    <img src={require('./../img/' + details.pic)} />
                    <button className='btn btn-danger'>Update Image</button>
                </div>

                <div className="description" id={ids}>
                    <ul>
                        <li>
                            <div className="title">
                                <h5>Title</h5>
                                <input type="text" value={name} disabled/>
                        
                            </div>
                        </li>
                        <li>
                            <div className="tags">
                                <h5>Tags</h5>
                                {cont}
                            </div>
                        </li>
                        <li>
                            <div className="type">
                                <h5>Type</h5> 
                                <input type="radio" id={"veg_"+details.name} name={"veg_"+details.name} value="veg" disabled />
                                <label for={"veg_"+details.name}>Veg</label>
                                <input type="radio" id={"non-veg_"+details.name} name={"veg_"+details.name} value="non-veg" disabled/>
                                <label for={"non-veg_"+details.name}>Non-Veg</label><br></br>
                            </div>
                        </li>
                        <li>
                            <div className="price">
                                <h5>Price</h5><input type="number" value={price} disabled onChange={(e) => { setprice(e.target.value) }} />
                            </div>
                        </li>
                        <li>
                            <button className="btn btn-secondary" id={'editfoods' + props.itemid} onClick={() => { edititems() }}>Edit</button>
                            <button className="btn btn-danger" id={'deletefoods' + props.itemid} onClick={()=>{deleteitems()}}>Delete</button>
                        </li>
                    </ul>

                </div>


            </div>

        </div>


    )

}
export default Edititem;