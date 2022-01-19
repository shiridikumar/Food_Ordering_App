import { useState, useEffect } from "react";
import Navbar from "../templates/Navbar";
import "./../css/components.css";
import { useNavigate } from "react-router-dom";
import Gallery from "./Gallery";
import axios, { Axios } from "axios";
import reportWebVitals from "../../reportWebVitals";

const Home = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [called, setCall] = useState(0);
  const [ele,setState]=useState()
  const categories = []
  const row=[]

  const callmenu=() => {
    const loadPost = async () => {
      await axios.get("http://localhost:4000/user/vendors", { crossdomain: true }).then(response => {
        for (var i = 0; i < response.data.length; i++) {
          categories.push(response.data[i])
          row.push(<Gallery id={i} cate={response.data[i]}/>)
        }

      })
      console.log(row.length)
      setCall(1);
      setState(row)
      return row;
    }
    if(called==0){
      var ans=loadPost();
    }
  }
  //<div style={{ textAlign: "center" }}>Happy Coding - {name}</div>;
  return (
    <>
      <section id="home" >
        <div className="container">
          <h1>Basketball canteen<br />online services</h1>
          <h2>Taste the madness from you door steps now!</h2>
          <div className="search2">
            <input className=" searchbar form-control mr-sm-2 " type="search" placeholder="Search for an item" aria-label="Search" style={{ alignContent: "center" }} />
            <button className="btn btn-danger mx-2 searchbut" type="Search">Search</button>
          </div>
        </div>
      </section>
      <section className="container gallery">
        <h1>Available items</h1>
        <div className="items">
          {ele}
          {callmenu()}
        </div>
      </section>
    </>
  );

};

export default Home;
