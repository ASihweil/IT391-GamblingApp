import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from './Auth.module.css';
import logo from "../assets/Logo.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login:", { email, password });
  };

  return (
    <div className={styles["auth-container"]}>
      <div className={styles.left}>
        <img src={logo} alt="logo" />
        <h1>Redbird Bets</h1>
      </div>

      <div className={styles.right}>
        <h2>Login</h2>

        <form className={styles.form} onSubmit={handleLogin}>
          <label className={styles.label}>Email</label>
          <input
            className={styles.input}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className={styles.label}>Password</label>
          <input
            className={styles.input}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <p className={styles.forgot}>Forgot Password?</p>

          <button className={styles["login-btn"]}>
            Log In
          </button>

          <button
            type="button"
            className={styles["signup-btn"]}
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