import { Chip, Icon } from "@mui/material";
import { useEffect, useState } from "react";


const Edititem = (props) => {
    const details = props.details;
    const [name, setname] = useState(details.name);
    const [price, setprice] = useState(details.price);
    const [type, settype] = useState(details.type);
    var r = [details.type, details.item];
    const row = []
    const present_tags=[];
    const [cont, setcont] = useState();
    useEffect(() => {
        const calltags = () => {
            for (var i = 0; i < r.length; i++) {
                row.push(<Chip label={r[i]} href="#basic-chip" />)
                console.log("hellooooo");
            }
            setcont(row);
        }
        calltags();

    }, [])
    const ids = props.itemid + 'edit-details';
    var button_click = 0;
    const del_row = [];

    const del_chip=(a)=>{
        console.log(a)
        var ind=a.target.parentElement.getAttribute("id");
        if(!ind){
            ind=a.target.parentElement.parentElement.getAttribute("id");
        }
        console.log(ind);
        var ele=document.getElementById(ind);
        ele.remove();
    }


    const edititems = () => {
        if (button_click == 0) {
            var ele = document.getElementById(ids);
            var edit_items = ele.getElementsByTagName('input');
            for (var i = 0; i < edit_items.length; i++) {
                edit_items[i].disabled = false;
            }
            for (var i = 0; i < r.length; i++) {
                del_row.push(<Chip id={i+'_chips_'+props.itemid} label={r[i]} key={i+'_chip_'+props.itemid} onDelete={(a)=>del_chip(a)} />)
            }
            //del_row.push(<Icon color="primary" style={{ "cursor": "pointer" }} onClick={() => { console.log("added") }}>add_circle</Icon>);
            setcont(del_row);
        }
        else{
            var ele = document.getElementById(ids);
            var edit_items = ele.getElementsByTagName('input');
            for (var i = 0; i < edit_items.length; i++) {
                edit_items[i].disabled = false;
            }
            const del_row = [];
            for (var i = 0; i < r.length; i++) {
                del_row.push(<Chip label={r[i]}/>)
            }
            setcont(del_row);

        }


    }

    return (
        <div className="card" id={props.itemid}>
            <div className="card-body">
                <div className="pic-upload">
                    <img src={require('./../img/' + details.pic)} />
                    <button className='btn btn-danger'>Update Image</button>
                </div>

                <div className="description" id={ids}>
                    <div className="title">
                        <h5>Title</h5>
                        <input type="text" value={name} disabled />
                    </div>
                    <div className="tags">
                        <h5>Tags</h5>
                        {cont}
                    </div>
                    <div className="type">
                        <h5>Type</h5><input type="text" value={type} disabled />
                    </div>
                    <div className="price">
                        <h5>Price</h5><input type="text" value={price} disabled />
                    </div>
                    <button className="btn btn-secondary" onClick={() => { edititems() }}>Edit</button>
                    <button className="btn btn-danger">Delete</button>

                </div>


            </div>

        </div>


    )

}
export default Edititem;