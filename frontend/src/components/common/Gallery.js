import { requirePropFactory } from "@mui/material";
import { useState, useEffect } from "react";
import "./../css/components.css";
import { useNavigate } from "react-router-dom";

const Gallery = (props) => {
    const navigate = useNavigate();
    return (
    <>
        <div className="card" >
            <div className="img-desc" style={{backgroundImage:'url('+require('./../img/'+'pizzas'+'.jpg')+')' ,backgroundPosition:'center',backgroundSize:'250px 250px'}}>
            <a  onClick={()=>{navigate("/profile")}}><h1>akanksha</h1></a>
            </div>
            <h2>Pizzas</h2>
        </div>
    </>
    )
};

export default Gallery;