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
        console.log(details);
        const calltags = () => {
            for (var i = 0; i < r.length; i++) {
                row.push(<Chip label={r[i]} href="#basic-chip" />)
                console.log("hellooooo");
            }
            setcont(row);
            setfr(r);
        }
        calltags();

    }, [])
    const ids = props.itemid + 'edit-details';
    const [button_click,setbut] = useState(0);
    var del_row = [];
    const [new_tag,settag]=useState();
    const ltags=r.length;
    var  nt=0;
    const [fr,setfr]=useState();

    const del_chip=(a)=>{
        console.log(a)
        var ind=a.target.parentElement.getAttribute("id");
        if(!ind){
            ind=a.target.parentElement.parentElement.getAttribute("id");
        }
        console.log(ind);
        var ele=document.getElementById(ind);
        var tar;
        for(var i=0;i<ind.length;i++){
            if(ind[i]=='_'){
                tar=i;
                break;
            }
        }
        console.log(del_row);
        var del_el=ind.slice(0,tar);
        console.log(r);
        for(var i=0;i<r.length;i++){
            if(r[i]==del_el){
                r.splice(i,1);
                del_row.splice(i,1);
            }
        }
        console.log(r);
        setcont(r);
        setfr(r);
        console.log(del_row);
        var ne=[];
        for(var i=0;i<del_row.length;i++){
            ne.push(del_row[i]);
        }
        setcont(ne);

    }
    const addtag=()=>{
        nt++;
        var wanted=document.getElementById('input_tag'+props.itemid).value
        r.push(wanted);
        setfr(r);
        var ne=[]
        var i=ltags+nt;
        console.log(wanted);
        
        //del_row.push(<Chip id={new_tag+'_'+i+'_chips_'+props.itemid} label={new_tag} key={i+'_chip_'+props.itemid} onDelete={(a)=>del_chip(a)}/>);
        for(var i=0;i<r.length-1;i++){
            ne.push(del_row[i]);
        }
        //del_row.push(<Chip id={new_tag+'_'+i+'_chips_'+props.itemid} label={new_tag} key={i+'_chip_'+props.itemid} onDelete={(a)=>del_chip(a)}/>);
        ne.push(<Chip id={wanted+'_'+i+'_chips_'+props.itemid} label={wanted} key={i+'_chip_'+props.itemid} onDelete={(a)=>del_chip(a)}/>);
        ne.push(del_row[del_row.length-2]);
        ne.push(del_row[del_row.length-1]);
        del_row=ne;
        setcont(ne);

    }


    const edititems = () => {
        if (button_click == 0) {
            var ele = document.getElementById(ids);
            var edit_items = ele.getElementsByTagName('input');
            for (var i = 0; i < edit_items.length; i++) {
                edit_items[i].disabled = false;
            }
            for (var i = 0; i < fr.length; i++) {
                del_row.push(<Chip id={fr[i]+'_'+i+'_chips_'+props.itemid} label={fr[i]} key={i+'_chip_'+props.itemid} onDelete={(a)=>del_chip(a)} />)
            }
            del_row.push(<input id={'input_tag'+props.itemid} type="text" placeholder="add a tag" style={{"width":"100px"}}  onChange={e=>settag(e.target.value)}/>);
            del_row.push(<Icon  style={{ "cursor": "pointer" }} onClick={() => { addtag() }}>add_circle</Icon>);
            setcont(del_row);
            var but=document.getElementById("editfoods"+props.itemid);
            but.innerHTML="Save";
            r=fr;
            setbut(1);
        }
        else{
            console.log("here click");
            var ele = document.getElementById(ids);
            var edit_items = ele.getElementsByTagName('input');
            r=fr;
            for (var i = 0; i < edit_items.length; i++) {
                edit_items[i].disabled = true;
            }

            console.log(r);
            for (var i = 0; i < fr.length; i++) {
                del_row.push(<Chip label={fr[i]}/>)
            }
            setcont(del_row);
            var but=document.getElementById("editfoods"+props.itemid);
            but.innerHTML="Edit";
            setbut(0);
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
                    <ul>
                    <li>
                    <div className="title">
                        <h5>Title</h5>
                        <input type="text" value={name} disabled />
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
                        <h5>Type</h5><input type="text" value={type} disabled />
                    </div>
                    </li>
                    <li>
                    <div className="price">
                        <h5>Price</h5><input type="text" value={price} disabled />
                    </div>
                    </li>
                    <li>
                    <button className="btn btn-secondary" id={'editfoods'+props.itemid} onClick={() => { edititems() }}>Edit</button>
                    <button className="btn btn-danger">Delete</button>
                    </li>
                    </ul>

                </div>


            </div>

        </div>


    )

}
export default Edititem;