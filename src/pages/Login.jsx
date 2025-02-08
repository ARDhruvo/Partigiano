import { useState } from "react";
import TextField from "@mui/material/TextField";
import Field from "../components/Field";
import { Link } from "react-router-dom";
import { Formik, Form, /*Field,*/ ErrorMessage } from "formik";
import * as Yup from "yup";
import "./Login.css";

function Login() {
  const [isLogin, setIsLogin] = useState(true);

  const loginSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const signupSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    // Handle form submission here
    console.log(values);
    setSubmitting(false);
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="loginPage">
      <div>
        <header className="logPage">
          <h2>Welcome To</h2>
          <h1>PARTIGIANO</h1>
          <hr />
        </header>
      </div>
      <Formik
        initialValues={{
          email: "",
          username: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={isLogin ? loginSchema : signupSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            {!isLogin && (
              <div className="textbox">
                <Field
                  title="E-Mail"
                  type="email"
                  name="email"
                  placeholder="E-Mail"
                />
                <ErrorMessage name="email" component="div" className="error" />
              </div>
            )}
            <div className="textbox">
              <Field
                title="Username"
                type="text"
                name="username"
                placeholder="Username"
              />
              <ErrorMessage name="username" component="div" className="error" />
            </div>
            <div className="textbox">
              <Field
                title="Password"
                vis="password"
                type="password"
                name="password"
                placeholder="Password"
              />
              <ErrorMessage name="password" component="div" className="error" />
            </div>
            {!isLogin && (
              <div className="textbox">
                <Field
                  title="Confirm Password"
                  vis="password"
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="error"
                />
              </div>
            )}
            <div>
              <Link to="/">
                <button
                  type="submit"
                  className={isLogin ? "btnLog" : "btnSign"}
                  /*disabled={isSubmitting}*/
                >
                  {isLogin ? "Log In" : "Sign Up"}
                </button>
              </Link>
            </div>
          </Form>
        )}
      </Formik>
      <div>
        <button
          className={isLogin ? "inactbtnSign" : "inactbtnLog"}
          onClick={toggleMode}
        >
          {isLogin ? "Sign Up Instead?" : "Log In Instead?"}
        </button>
      </div>
    </div>
  );
}

export default Login;
