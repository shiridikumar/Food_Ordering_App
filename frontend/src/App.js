import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";

import UsersList from "./components/users/UsersList";
import Home from "./components/common/Home";
import Register from "./components/common/Register";
import Navbar from "./components/templates/Navbar";
import Profile from "./components/users/Profile";
import axios from "axios"
import Paper from "@mui/material/Paper";

const Layout = () => {
  return (
    <div className="homepage">
      
      <div className="navdiv continer">
        <Navbar/>
      </div>
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};
var hello=(a)=>{
  axios.get("http://localhost:4000",  { crossdomain: true }).then(response => {
      console.log("aaaa");
      console.log(response);
    });

}
function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home/>}/>
          <Route path="users" element={<UsersList />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
