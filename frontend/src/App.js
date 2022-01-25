import { BrowserRouter, Routes, Route, Outlet, Navigate, useNavigate, useParams, useLocation } from "react-router-dom";
import "./App.css";
import Home from "./components/common/Home";
import Navbar from "./components/templates/Navbar";
import Profile from "./components/common/Profile";
import axios from "axios"
import Paper from "@mui/material/Paper";
import Login from "./components/users/Login";
import Register from "./components/users/Register";
import Gallery from "./components/common/Gallery";
import { useEffect } from "react";
import log from "./log";
import Canteen from "./components/common/Canteen";
import Myorders from "./components/common/Myorders";
import SearchTab from "./components/common/SearchTab";
import VendorsDashboard from "./components/common/VendorsDashboard";
import VendorMenu from "./components/common/VendorMenu";
import Vendorprofile from "./components/common/Vendorprofile";
const Layout = (props) => {
  const navigate = useNavigate();
  const location=useLocation();
  if(!location.state){
      console.log("asdaaaa");
      return (
        <Login />
      )
    }
    else {
      return (
        <div className="homepage">
          <div className="navdiv continer">
            <Navbar />
          </div>
          <div className="container">
            <Outlet />
          </div>
        </div>
      )
    }
  }


  const App = (props) => {
    const params=useParams();
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/signin" element={<Login logged={0} />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/" element={<Layout/>}>
              <Route path="/" element={<Home/>}/>
              <Route path="/home" element={<Home />} />
              <Route path="/register" element={<Login />} />
            </Route>
            <Route path="/profile" element={<Profile />} />
            <Route path="/canteen" element ={<Canteen />}/>
            <Route path="/MyOrders" element ={<Myorders />}/>
            <Route path="/SearchResults" element ={<SearchTab />}/>
            <Route path="/Vendors" element={<VendorsDashboard />}/>
            <Route path="/vendormenu" element={<VendorMenu />}/>
            <Route path="/Vendorprofile" element={<Vendorprofile />}/>
          </Routes>
        </BrowserRouter>
      </>
    );
  }

  export default App;

