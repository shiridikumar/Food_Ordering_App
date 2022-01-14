import { useState, useEffect } from "react";
import Navbar from "../templates/Navbar";
import "./../css/components.css";
import { useNavigate } from "react-router-dom";
import Gallery from "./Gallery";
import axios, { Axios } from "axios";

const Home = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [called, setCall] = useState(0);
  useEffect(() => {
    setName("Dass TAs");
  }, []);

  const callmenu2 = 
    async () => {
      const row = []
      const categories = []
      await axios.get("http://localhost:4000/user/categories", { crossdomain: true }).then(response => {
        while(response.data.length==0){
        for (var i = 0; i < response.data.length; i++) {
          categories.push(response.data[i])
          setCall(5)
        }
      }
      })
      return categories;
  };
  const callmenu = () => {

    const ans = callmenu2()
    const row = [];

    for (var i = 0; i < ans.length; i++) {
      row.push(<Gallery />)
    }
    console.log(row.length);
    console.log(called);
    return row;
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
          {callmenu()}
        </div>
      </section>
    </>
  );

};

export default Home;
