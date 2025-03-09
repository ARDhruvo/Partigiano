// ResetPassword.jsx
"use client";

import { useState } from "react";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "./Login.css";

function ResetPassword() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      console.log(localStorage.getItem("verificationEmail"), values.password);
      const response = await fetch(
        "http://localhost:4000/forgot-password/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: localStorage.getItem("verificationEmail"),
            password: values.password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Password reset successfully!");
        navigate("/login");
      } else {
        setError(data.message || "Failed to reset password");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="loginPage">
      <div>
        <header className="logPage">
          <h2>Reset Password</h2>
          <hr />
        </header>
      </div>
      <Formik
        initialValues={{ password: "", confirmPassword: "" }}
        validationSchema={Yup.object({
          password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .matches(
              /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
              "Password must contain at least one letter, one number, and one special character"
            )
            .required("Password is required"),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref("password")], "Passwords must match")
            .required("Confirm password is required"),
        })}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            <div className="textbox">
              <Field name="password">
                {({ field, meta }) => (
                  <TextField
                    {...field}
                    label="New Password"
                    type="password"
                    placeholder="New Password"
                    fullWidth
                    margin="normal"
                    error={meta.touched && !!meta.error}
                    helperText={meta.touched && meta.error}
                  />
                )}
              </Field>
            </div>
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
            {error && <div className="error">{error}</div>}
            <div>
              <button type="submit" className="btn" disabled={isSubmitting}>
                Reset Password
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <div>
        <button className="inactBtn" onClick={() => navigate("/login")}>
          Return to Login
        </button>
      </div>
    </div>
  );
}

export default ResetPassword;
