import { useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { Tabs, Tab, alertTitleClasses } from "@mui/material";
import { useEffect, useState } from "react";
import "./../css/components.css";
import axios from "axios";




const Navbar = (props) => {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const linkchange = (event, ne) => {
    setValue(ne);
  }
  const location = useLocation();
  console.log(location.state.data);
  const [wallet, setwallet] = useState(location.state.data.wallet);
  const [addamount, setadd] = useState(0);

  useEffect(() => {
    const loadpost = async () => {
      await axios.post("http://localhost:4000/user/userdetails", { email: location.state.data.email }).then(response => {
        location.state.data = response.data;
        console.log("helllllo");
        setwallet(response.data.wallet);
      })
    }
    loadpost();
  }, [])
  console.log(location.state.data);

  const addwallet = async () => {
    if (addamount <= 0) {
      alert("please enter a valid amount(>0)");
    }
    else {
      await axios.post("http://localhost:4000/user/addwallet", { crossdomain: true, wallet: addamount, actual: wallet, email: location.state.data.email }).then(response => {
        window.location.reload();


      })
    }

  }



  return (
    <Box className="navtab" >
      <Tabs value={value} onChange={linkchange} aria-label="nav tabs example" TabIndicatorProps={{ style: { background: 'white', color: 'white' } }}>
        <Tab label="Home" onClick={() => navigate("/home")} style={{ color: "white" }} />
        <Tab label="MyOrders" onClick={() => navigate("/MyOrders", { state: { data: location.state.data } })} style={{ color: "white" }} />
        <Tab label="Profile" onClick={() => navigate("/profile", { state: { data: location.state.data } })} style={{ color: "white" }} />
        <Tab label="Favourites" onClick={() => navigate("/Favourites", { state: { data: location.state.data } })} style={{ color: "white" }} />
        <Tab label="Sign out" onClick={() => navigate("/signin")} style={{ color: "white" }} />
        <button type="button" className="btn" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ "color": "white" }}>
          <i className="fas fa-money-bill-wave"></i>  Wallet : {wallet}
        </button>
        <i className="fas fa-money-bill-wave"></i>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Wallet amount details</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

              </div>
              <div className="modal-body">
                <div className="wal">
                  <h2>Current Wallet amount : {wallet}</h2>
                  <div className="addamount">
                    <input type="number" value={addamount} onChange={(e) => { setadd(e.target.value) }} placeholder="Add amount" />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" onClick={() => { addwallet() }}>Add amount</button>
              </div>
            </div>
          </div>
        </div>
      </Tabs>
    </Box>
  );
};

export default Navbar;
