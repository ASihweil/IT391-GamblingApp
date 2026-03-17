import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import logo from "../assets/Logo.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    console.log("Login:", { email, password });

    // later connect 
  };

  return (
    <div className="auth-container">
      <div className="left">
        <img src={logo} alt="logo" />
        <h1>Redbird Bets</h1>
      </div>

      <div className="right">
        <h2>Login</h2>

        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <p className="forgot">Forgot Password?</p>

          <button className="login-btn">Log In</button>
           <button
          className="signup-btn"
          onClick={() => navigate("/signup")}
        >
          SIGN UP!
        </button>
        </form>

        
      </div>
    </div>
  );
}

export default Login;