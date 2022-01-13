import { useState, useEffect } from "react";
import Navbar from "../templates/Navbar";
import "./../css/components.css";
import { useNavigate } from "react-router-dom";
import Gallery from "./Gallery";

const Home = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setName("Dass TAs");
  }, []);
  const callmenu=()=>{
    const row=[]
    for(var i=0;i<8;i++){
      row.push(<Gallery id={i}/>)
    }
    return  row;

  }
  //<div style={{ textAlign: "center" }}>Happy Coding - {name}</div>;
  return(
    <>
    <section id="home" >
      <div className="container">
        <h1>Basketball canteen<br/>online services</h1>
        <h2>Taste the madness from you door steps now!</h2>
        <div className="search2">
          <input className=" searchbar form-control mr-sm-2 " type="search" placeholder="Search for an item" aria-label=  "Search" style={{alignContent:"center"}}/>
          <button className="btn btn-danger mx-2 searchbut" type="Search">Search</button>
        </div>
      </div>
    </section>
    <section className="container gallery">
      <h1>Available items</h1>
      <div className="items">
        {callmenu()}
      </div>
    </section>
    </>
  );
  
};

export default Home;
