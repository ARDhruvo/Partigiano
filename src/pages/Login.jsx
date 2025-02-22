"use client";

import { useState } from "react";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "./Login.css";

function Login() {
  const [values, setValues] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

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
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Handle successful login/signup
        navigate("/");
      } else {
        // Handle errors
        setErrors({ submit: data.message });
      }
    } catch (error) {
      console.error("Error:", error);
      setErrors({ submit: "An error occurred. Please try again." });
    }

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
        validateOnChange={true}
        validateOnBlur={true}
      >
        {({ isSubmitting, errors, touched, values }) => (
          <Form>
            {!isLogin && (
              <div className="textbox">
                <Field name="email">
                  {({ field, meta }) => (
                    <TextField
                      {...field}
                      label="E-Mail"
                      type="email"
                      placeholder="E-Mail"
                      fullWidth
                      margin="normal"
                      error={meta.touched && !!meta.error}
                      helperText={meta.touched && meta.error}
                    />
                  )}
                </Field>
              </div>
            )}
            <div className="textbox">
              <Field name="username">
                {({ field, meta }) => (
                  <TextField
                    {...field}
                    label="Username"
                    type="text"
                    placeholder="Username"
                    fullWidth
                    margin="normal"
                    error={touched.username && !!errors.username}
                    helperText={touched.username && errors.username}
                  />
                )}
              </Field>
            </div>
            <div className="textbox">
              <Field name="password">
                {({ field, meta }) => (
                  <TextField
                    {...field}
                    label="Password"
                    type="password"
                    placeholder="Password"
                    fullWidth
                    margin="normal"
                    error={touched.password && !!errors.password}
                    helperText={touched.password && errors.password}
                  />
                )}
              </Field>
            </div>
            {!isLogin && (
              <div className="textbox">
                <Field name="confirmPassword">
                  {({ field, meta }) => (
                    <TextField
                      {...field}
                      label="Confirm Password"
                      type="password"
                      placeholder="Confirm Password"
                      fullWidth
                      margin="normal"
                      error={meta.touched && !!meta.error}
                      helperText={meta.touched && meta.error}
                    />
                  )}
                </Field>
              </div>
            )}
            {errors.submit && <div className="error">{errors.submit}</div>}
            <div>
              <button type="submit" className="btn" disabled={isSubmitting}>
                {isLogin ? "Log In" : "Sign Up"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <div>
        <button className="inactBtn" onClick={toggleMode}>
          {isLogin ? "Sign Up Instead?" : "Log In Instead?"}
        </button>
      </div>
    </div>
  );
}

export default Login;
