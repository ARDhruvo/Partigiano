import React from "react";
import Button from "./button";
import { Link } from "react-router-dom";
import { useState } from "react";

function header() {

  const[addPath,setAddPath] =useState("/create");
  const[btn1Name,setBtn1Name] =useState("About");
  const[btn2Name,setBtn2Name] =useState("Login");
  

  return (
    <div className="header">
      <div className="header-logo">
        <Link to="/">
          <h3>PARTIGIANO</h3>
        </Link>
      </div>
      <div className="headerbtn">
        <Link to={addPath}>
          <button>Add</button>
        </Link> 
        <Link to="/aboutus">
          <button>{btn1Name}</button>
        </Link>
        <Link to="/login">
          <button>{btn2Name}</button>
        </Link>
      </div>
      <div>
        <hr />
      </div>
    </div>
  );
}

export default header;
