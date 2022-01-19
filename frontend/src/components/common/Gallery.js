import { requirePropFactory } from "@mui/material";
import { useState, useEffect } from "react";
import "./../css/components.css";
import { useNavigate } from "react-router-dom";

const Gallery = (props) => {
    const navigate = useNavigate();
    return (
    <>
        <a  onClick={()=>{navigate("/profile")}}>
        <div className="card" >
            <div className="img-desc" style={{backgroundImage:'url('+require('./../img/'+props.cate)+')' ,backgroundPosition:'center',backgroundSize:'250px 250px'}}>
            <h1>View</h1>
            </div>
            <h2>{props.cate}</h2>
        </div>
        </a>
    </>
    )
};

export default Gallery;