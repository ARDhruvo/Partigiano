"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function VerificationSuccess() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    // Redirect after 3 seconds
    const timer = setTimeout(() => {
      navigate("/login");
    }, 3000);

    // Update countdown every second
    const countdownInterval = setInterval(() => {
      setCountdown((prevCount) => prevCount - 1);
    }, 1000);

    // Clean up timers on component unmount
    return () => {
      clearTimeout(timer);
      clearInterval(countdownInterval);
    };
  }, [navigate]);

  const handleManualRedirect = () => {
    navigate("/login");
  };

  return (
    <div className="loginPage">
      <div>
        <header className="logPage">
          <h2>Verification Complete</h2>
          <h1>PARTIGIANO</h1>
          <hr />
        </header>
      </div>
      <div style={{ marginTop: "2rem" }}>
        <p>
          Successfully verified. Redirecting you back to Log In in {countdown}{" "}
          seconds...
        </p>
        <p>
          If it doesn't redirect, press{" "}
          <button className="textbtn" onClick={handleManualRedirect}>
            here
          </button>
        </p>
      </div>
    </div>
  );
}

export default VerificationSuccess;
