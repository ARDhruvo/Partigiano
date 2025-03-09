// ForgotPassword.jsx
"use client";

import { useState } from "react";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "./Login.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [userExists, setUserExists] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleEmailSubmit = async (values) => {
    try {
      const response = await fetch(
        `http://localhost:4000/info/${values.email}`
      );
      const data = await response.json();

      if (response.ok) {
        setUserExists(true);

        // Send OTP regardless of user status (verified or pending)
        const otpResponse = await fetch(
          "http://localhost:4000/forgot-password/send-otp",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: values.email }),
          }
        );

        if (otpResponse.ok) {
          localStorage.setItem("verificationEmail", values.email);
          setOtpSent(true);
        }
      } else {
        setError("User does not exist");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again.");
    }
  };

  const handleOtpSubmit = async (values) => {
    try {
      console.log("Password is reset");
      const response = await fetch(
        "http://localhost:4000/forgot-password/verify-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: values.email, otp: values.otp }),
        }
      );

      if (response.ok) {
        // Navigate to the reset password page after OTP verification
        navigate("/reset-password");
      } else {
        setError("Invalid OTP");
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
          <h2>Forgot Password</h2>
          <hr />
        </header>
      </div>
      <Formik
        initialValues={{ email: "", otp: "" }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email")
            .required("Email is required"),
          otp: otpSent
            ? Yup.string().required("OTP is required")
            : Yup.string(),
        })}
        onSubmit={otpSent ? handleOtpSubmit : handleEmailSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
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
                    disabled={userExists}
                  />
                )}
              </Field>
            </div>
            {otpSent && (
              <div className="textbox">
                <Field name="otp">
                  {({ field, meta }) => (
                    <TextField
                      {...field}
                      label="OTP"
                      type="text"
                      placeholder="Enter OTP"
                      fullWidth
                      margin="normal"
                      error={meta.touched && !!meta.error}
                      helperText={meta.touched && meta.error}
                    />
                  )}
                </Field>
              </div>
            )}
            {error && <div className="error">{error}</div>}
            <div>
              <button type="submit" className="btn" disabled={isSubmitting}>
                {otpSent ? "Verify OTP" : "Submit"}
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

export default ForgotPassword;
