import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import {  Tabs,Tab} from "@mui/material";
import { useState } from "react";
import "./../css/navbar.css";




const Navbar = () => {
  const navigate = useNavigate();
  const [value,setValue]=useState(0);

  const linkchange=(event,ne)=>{
    setValue(ne);


  }


  return (
    
    <Box  className="navtab" >
      <Tabs value={value} onChange={linkchange} aria-label="nav tabs example" TabIndicatorProps={{style:{background:'white',color:'white'}}}>
        <Tab label="Home" onClick={()=>navigate("/home")} style={{color:"white"}} />
        <Tab label="Menu" onClick={()=>navigate("/profile")} style={{color:"white"}}  />
        <Tab label="Combo packs" onClick={()=>navigate("/home")} style={{color:"white"}}/>
        <Tab label="Sign out" onClick={()=>navigate("/home")} style={{color:"white"}}/>
      </Tabs>
    </Box>

    /*<Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Canteen Portal
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button color="inherit" onClick={() => navigate("/users")}>
            Users
          </Button>
          <Button color="inherit" onClick={() => navigate("/register")}>
            Register
          </Button>
          <Button color="inherit" onClick={() => navigate("/profile")}>
            My Profile
          </Button>
        </Toolbar>
      </AppBar>
    </Box>*/
  );
};

export default Navbar;
