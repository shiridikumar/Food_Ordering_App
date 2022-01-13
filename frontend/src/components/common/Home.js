import { useState, useEffect } from "react";
import "./../css/navbar.css";

const Home = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setName("Dass TAs");
  }, []);

  //<div style={{ textAlign: "center" }}>Happy Coding - {name}</div>;
  return(
    <section id="home" >
      <div className="container">
        <h1>Basketball canteen<br/>online services</h1>
      </div>

    </section>
  );
  
};

export default Home;
