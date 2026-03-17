import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import logo from "../assets/Logo.png";

function Signup() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    console.log("Signup:", form);

    // later connect 
  };

  return (
    <div className="auth-container">
      <div className="left">
        <img src={logo} alt="logo" />
        <h1>Redbird Bets</h1>
      </div>

      <div className="right">
        <h2>Sign Up</h2>

        <form onSubmit={handleSignup}>
          <label>Email</label>
          <input
            name="email"
            type="email"
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            name="password"
            type="password"
            onChange={handleChange}
            required
          />

          <label>Confirm Password</label>
          <input
            name="confirmPassword"
            type="password"
            onChange={handleChange}
            required
          />

          <button className="login-btn">Create Account</button>
          <button
          className="signup-btn"
          onClick={() => navigate("/")}
        >
          BACK TO LOGIN
        </button>
        </form>

        
      </div>
    </div>
  );
}

export default Signup;