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

<<<<<<< Updated upstream
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
=======
  const loginSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const signupSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
        "Password must contain at least one number and one special character"
      )
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await fetch(
        `http://localhost:4000/login/auth/${isLogin ? "login" : "signup"}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
          credentials: "include", // Important for cookies
        }
      );

      const data = await response.json();

      if (response.ok) {
        if (isLogin) {
          // Store tokens in localStorage as fallback
          if (data.accessToken) {
            localStorage.setItem("accessToken", data.accessToken);
          }
          if (data.refreshToken) {
            localStorage.setItem("refreshToken", data.refreshToken);
          }

          // Store user info
          if (data.user) {
            localStorage.setItem("user", JSON.stringify(data.user));
          }

          navigate("/"); // Navigate to Home.jsx
        } else {
          // Store email in localStorage for OTP verification
          localStorage.setItem("verificationEmail", values.email);
          navigate("/verify"); // Navigate to Verify.jsx after signup
        }
      } else if (response.status === 403 && data.redirectTo === "/verify") {
        // Store email in localStorage for OTP verification
        localStorage.setItem("verificationEmail", data.email);
        navigate("/verify"); // Redirect to verification page if account is not verified
      } else {
        setErrors({ submit: data.message });
      }
    } catch (error) {
      console.error("Error:", error);
      setErrors({ submit: "An error occurred. Please try again." });
>>>>>>> Stashed changes
    }
  };

  return (
    <>
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
    </>
  );
}

export default App;
