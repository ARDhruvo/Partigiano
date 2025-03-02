"use client"
import TextField from "@mui/material/TextField"
import { useNavigate } from "react-router-dom"
import { Formik, Form, Field } from "formik"
import * as Yup from "yup"
import "./Login.css"

function OTPVerification() {
  const navigate = useNavigate()

  const otpSchema = Yup.object().shape({
    otp: Yup.string()
      .matches(/^[0-9]+$/, "OTP must be only digits")
      .length(6, "OTP must be exactly 6 digits")
      .required("OTP is required"),
  })

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await fetch("http://localhost:4000/login/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      const data = await response.json()

      if (response.ok) {
        // Handle successful verification
        navigate("/")
      } else {
        // Handle errors
        setErrors({ submit: data.message })
      }
    } catch (error) {
      console.error("Error:", error)
      setErrors({ submit: "An error occurred. Please try again." })
    }

    setSubmitting(false)
  }

  return (
    <div className="loginPage">
      <div>
        <header className="logPage">
          <h2>Verify Your Account</h2>
          <h1>PARTIGIANO</h1>
          <hr />
        </header>
      </div>
      <Formik
        initialValues={{
          otp: "",
        }}
        validationSchema={otpSchema}
        onSubmit={handleSubmit}
        validateOnChange={true}
        validateOnBlur={true}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            <div className="textbox">
              <Field name="otp">
                {({ field, meta }) => (
                  <TextField
                    {...field}
                    label="OTP"
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    fullWidth
                    margin="normal"
                    error={touched.otp && !!errors.otp}
                    helperText={touched.otp && errors.otp}
                  />
                )}
              </Field>
            </div>
            {errors.submit && <div className="error">{errors.submit}</div>}
            <div>
              <button type="submit" className="btn" disabled={isSubmitting}>
                Verify OTP
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <div>
        <button className="inactBtn" onClick={() => navigate("/login")}>
          Back to Login
        </button>
      </div>
    </div>
  )
}

export default OTPVerification

