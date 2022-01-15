import { useState, useEffect } from "react";
import Navbar from "../templates/Navbar";
import { useNavigate } from "react-router-dom";

import axios, { Axios } from "axios";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";



const Login = () => {
    return(
    <>
    <div className="container">
        <TextField label="username" variant="outlined" required />
        <TextField label="password" variant="outlined" required type="password"/>
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={1}
                label="User Type"
            >
                <MenuItem value={0}>Buyer</MenuItem>
                <MenuItem value={1}>Vendor</MenuItem>
            </Select>
        </FormControl>
        <Button variant="contained">Submit</Button>
        </div>

    </>
    )
}

export default Login;