import { requirePropFactory } from "@mui/material";
import { useState, useEffect } from "react";
import "./../css/components.css";
import { useNavigate } from "react-router-dom";

const Gallery = (props) => {
    const navigate = useNavigate();
    return (
    <>
        <a  onClick={()=>{navigate('/canteen'+props.names)}}>
        <div className="card" >
            <div className="img-desc" style={{backgroundImage:'url('+require('./../img/'+props.cate)+')' ,backgroundPosition:'center',backgroundSize:'230px 180px',backgroundRepeat:"no-repeat"}}>
            <h1>View</h1>
            </div>
            <h4>{props.names}</h4>
        </div>
        </a>

        
    </>
    )
};

export default Gallery;