import React from "react";
import Button from "./button";
import { Link } from "react-router-dom";

function header() {
  return (
    <div className="header">
      <div className="header-logo">
        <Link to="/">
          <h3>PARTIGIANO</h3>
        </Link>
      </div>
      <div className="headerbtn">
        {/* <Link to="/category">
          <button>Add</button>
        </Link> */}
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/login">
          <button>Sign Up</button>
        </Link>
      </div>
      <div>
        <hr />
      </div>
    </div>
  );
}

export default header;
