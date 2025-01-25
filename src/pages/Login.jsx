import { useState } from "react";
import TextField from "@mui/material/TextField";
import Field from "../components/Field";

function App() {
  const [btn, setBtn] = useState("Log In");
  const [inactBtn, setInactBtn] = useState("Sign Up Instead?");
  const [loggedIn, setLogIn] = useState(true);
  const [btnClass, setBtnClass] = useState("btnLog");
  const [inactBtnClass, setinactBtnClass] = useState("inactbtnSign");
  const [email, setEmail] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const swap = () => {
    if (loggedIn) {
      setLogIn(false);
      setBtn("Sign Up");
      setInactBtn("Log In Instead?");
      setBtnClass("btnSign");
      setinactBtnClass("inactbtnLog");
      setEmail(<Field title="E-Mail" />);
      setConfirmPassword(<Field title="Confirm Password" vis="password" />);
    } else {
      setLogIn(true);
      setBtn("Log In");
      setInactBtn("Sign Up Instead?");
      setBtnClass("btnLog");
      setinactBtnClass("inactbtnSign");
      setEmail();
      setConfirmPassword();
    }
  };

  return (
    <div className="loginPage">
      <div>
        <header className="logPage">
          <h2>Welcome To</h2>
          <h1>PARTIGIANO</h1>
          {/* Use Logo Later */}
          <hr />
        </header>
      </div>
      <div className="textbox">{email}</div>
      <div className="textbox">
        <Field title="Username" />
      </div>
      <div className="textbox">
        <Field title="Password" vis="password" />
      </div>
      <div className="textbox">{confirmPassword}</div>
      <div>
        <button className={btnClass}>{btn}</button>
      </div>
      <div>
        <button className={inactBtnClass} onClick={swap}>
          {inactBtn}
        </button>
      </div>
    </div>
  );
}

export default App;
